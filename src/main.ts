import { vec2 } from 'gl-matrix';

main();

function paint_c_space(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 360; ++i) {
    for (let j = 0; j < 360; ++j) {
      const alpha = (Math.PI * i) / 180;
      const alpha_prime = (Math.PI * j) / 180;

      const elbow = vec2.fromValues(Math.cos(alpha) - 0.5, Math.sin(alpha));
      const elbow_prime = vec2.fromValues(
        Math.cos(alpha_prime) + 0.5,
        Math.sin(alpha_prime),
      );

      const elbow_distance = vec2.distance(elbow, elbow_prime);

      if (elbow_distance > 1.9 || elbow_distance < 0.01) {
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }
}

function draw_robot_arms(
  ctx: CanvasRenderingContext2D,
  alpha: number,
  alpha_prime: number,
) {
  const elbow = vec2.fromValues(Math.cos(alpha) - 0.5, Math.sin(alpha));
  const elbow_prime = vec2.fromValues(
    Math.cos(alpha_prime) + 0.5,
    Math.sin(alpha_prime),
  );
  const elbow_distance = vec2.distance(elbow, elbow_prime);
  const between_elbows = vec2.sub(vec2.create(), elbow_prime, elbow);

  const perp_length = Math.sqrt(1 - Math.pow(elbow_distance * 0.5, 2));
  let perp = vec2.normalize(vec2.create(), [
    -between_elbows[1],
    between_elbows[0],
  ]);
  vec2.scale(perp, perp, perp_length);

  const wrist_location = vec2.add(
    vec2.create(),
    perp,
    vec2.lerp(vec2.create(), elbow, elbow_prime, 0.5),
  );

  ctx.beginPath();
  ctx.moveTo(-0.5, 0);
  ctx.lineTo(elbow[0], elbow[1]);
  ctx.lineTo(wrist_location[0], wrist_location[1]);
  ctx.lineTo(elbow_prime[0], elbow_prime[1]);
  ctx.lineTo(0.5, 0);
  ctx.stroke();
}

function paint_robot(ctx: CanvasRenderingContext2D, robot_state) {
  ctx.resetTransform();
  ctx.clearRect(0, 0, 480, 360);

  ctx.translate(240, 180);
  ctx.scale(-100, 100);
  ctx.rotate(Math.PI / 2);

  ctx.lineJoin = 'round';

  const draw_radius = 0.05;

  ctx.beginPath();
  ctx.arc(-0.5, 0, draw_radius, 0, 2 * Math.PI, true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0.5, 0, draw_radius, 0, 2 * Math.PI, true);
  ctx.fill();

  ctx.lineWidth = draw_radius;

  draw_robot_arms(ctx, robot_state.alpha, robot_state.alpha_prime);
  // draw_robot_arm(ctx, vec2.fromValues(-0.5, 0), robot_state.alpha);
  // draw_robot_arm(ctx, vec2.fromValues(0.5, 0), robot_state.alpha_prime);
}

function main() {
  const robot_state = {
    alpha: Math.PI / 2,
    alpha_prime: Math.PI / 2,
  };

  const c_space_canvas: HTMLCanvasElement = document.getElementById(
    'c-space',
  ) as HTMLCanvasElement;
  const c_space_ctx = c_space_canvas.getContext('2d');

  paint_c_space(c_space_ctx);

  const simulation_canvas: HTMLCanvasElement = document.getElementById(
    'simulation',
  ) as HTMLCanvasElement;
  const simulation_ctx = simulation_canvas.getContext('2d');

  paint_robot(simulation_ctx, robot_state);

  c_space_canvas.onmousemove = function (event: MouseEvent) {
    if (event.buttons) {
      robot_state.alpha = (Math.PI * event.offsetX) / 180;
      robot_state.alpha_prime = (Math.PI * event.offsetY) / 180;

      paint_robot(simulation_ctx, robot_state);
    }
  };
}
