import { vec2 } from 'gl-matrix';

main();

function paint_c_space(ctx) {
  for (let i = 0; i < 360; ++i) {
    for (let j = 0; j < 360; ++j) {
      const alpha = (Math.PI * i) / 180;
      const alpha_prime = (Math.PI * j) / 180;

      const elbow = [Math.cos(alpha) - 0.5, Math.sin(alpha)];
      const elbow_prime = [Math.cos(alpha_prime) + 0.5, Math.sin(alpha_prime)];

      if (vec2.distance(elbow, elbow_prime) > 1.9) {
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }
}

function paint_robot(ctx, robot_state) {
  ctx.translate(240, 180);
  ctx.scale(-100, 100);
  ctx.rotate(Math.PI / 2);

  const draw_radius = 0.05;

  ctx.beginPath();
  ctx.arc(-0.5, 0, draw_radius, 0, 2 * Math.PI, true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(0.5, 0, draw_radius, 0, 2 * Math.PI, true);
  ctx.fill();
}

function main() {
  const robot_state = {
    alpha: Math.PI / 2,
    alpha_prime: Math.PI / 2,
  };

  const c_space_canvas: HTMLCanvasElement = document.getElementById('c-space') as HTMLCanvasElement;
  const c_space_ctx = c_space_canvas.getContext('2d');

  paint_c_space(c_space_ctx);

  const simulation_canvas: HTMLCanvasElement = document.getElementById('simulation') as HTMLCanvasElement;
  const simulation_ctx = simulation_canvas.getContext('2d');

  paint_robot(simulation_ctx, robot_state);
}
