main();

function paint_c_space(ctx) {
    for (var i = 0; i < 360; ++i) {
        for (var j = 0; j < 360; ++j) {

            var alpha = Math.PI * i / 180;
            var alpha_prime = Math.PI * j / 180;

            var elbow = [Math.cos(alpha) - 0.5, Math.sin(alpha)];
            var elbow_prime = [Math.cos(alpha_prime) + 0.5, Math.sin(alpha_prime)];

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

    var draw_radius = 0.05;

    ctx.beginPath();
    ctx.arc(-0.5, 0, draw_radius, 0, 2 * Math.PI, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0.5, 0, draw_radius, 0, 2 * Math.PI, true);
    ctx.fill();
}

function main() {

    var robot_state = {
        alpha: Math.pi / 2,
        alpha_prime: Math.pi / 2
    };

    var c_space_canvas = document.getElementById('c-space');
    var c_space_ctx = c_space_canvas.getContext('2d');

    paint_c_space(c_space_ctx);

    var simulation_canvas = document.getElementById('simulation');
    var simulation_ctx = simulation_canvas.getContext('2d');

    paint_robot(simulation_ctx, robot_state);
}
