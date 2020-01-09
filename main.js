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

function main() {
    var c_space_canvas = document.getElementById('c-space');
    var c_space_ctx = c_space_canvas.getContext('2d');

    paint_c_space(c_space_ctx);
}
