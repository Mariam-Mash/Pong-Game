(function () {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    let box1 = {
        x: 100,
        y: 200,
        w: 20,
        h: 150,
        xdir: 0,
        ydir: 0,
        speed: 10
    };
    let box2 = {
        x: 680,
        y: 200,
        w: 20,
        h: 150,
        xdir: 0,
        ydir: 0,
        speed: 10
    };

    const boxes = {

        draw: function func_name(box1) {
            ctx.fillStyle = 'black';
            ctx.fillRect(box1.x, box1.y, box1.w, box1.h);
        },

        update: function func_name(box1) {

            if (box1.y <= 0) {
                box1.y = 1;
            }
            if (box1.y >= canvas.height - box1.h) {
                box1.y = canvas.height - box1.h - 1;
            }
            box1.y = box1.y + box1.ydir * box1.speed;
            if (box2.y <= 0) {
                box2.y = 1;
            }
            if (box2.y >= canvas.height - box2.h) {
                box2.y = canvas.height - box2.h - 1;
            }
            box2.y = box2.y + box2.ydir * box2.speed;
        }
    };
    let ball = {
        x: 200,
        y: 350,
        r: 15,
        xdir: 1,
        ydir: 1,
        speed: 5
    };
    let result1 = 0;
    let result2 = 0
    const myScore = function () {
        ctx.fillStyle = 'red';
        ctx.font = "30px Comic Sans MS";
        ctx.fillText("SCORE", 50, 30);
        ctx.font = "20px Comic Sans MS";
        ctx.fillStyle = 'black';
        ctx.fillText("Player1 ", 50, 70);
        ctx.fillText("Player2 ", 50, 100);
        ctx.fillText(result1, 150, 70);
        ctx.fillText(result2, 150, 100);
    };
    const score1 = function () {
        result1++;
        alert("Player1 score is: " + result1.toString());
        ball.x = 500;
        ball.y = 350;
    }
    const score2 = function () {
        result2++;
        alert("Player2 score is: " + result2.toString());
        ball.x = 500;
        ball.y = 350;
    }
    const myBall = {
        draw: function func_name(ball) {
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2, false);
            ctx.fill();
        },
        update: function func_name(ball) {
            if (ball.x >= canvas.width - ball.r || ball.x <= ball.r ||
                ((ball.x + ball.r) === box2.x && ball.y > box2.y && ball.y < box2.y + 500) ||
                (ball.x - ball.r - box1.w) === box1.x && ball.y > box1.y && ball.y < box1.y + 500) {
                ball.xdir = -ball.xdir;
            }
            ;
            if (ball.y >= canvas.height - ball.r || ball.y <= ball.r / 2) {
                ball.ydir = -ball.ydir;
            }
            ;
            ball.x = ball.x + ball.xdir * ball.speed;
            ball.y = ball.y + ball.ydir * ball.speed;
            if (ball.x < 100) {
                score2();
            }
            if (ball.x > 1000) {
                score1();
            }
        }
    };
    const draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        boxes.draw(box1);
        boxes.draw(box2);
        myBall.draw(ball);
        myScore();
    }
    const update = function () {
        boxes.update(box1);
        boxes.draw(box2);
        myBall.update(ball);
    };
    const loop = function () {
        draw();
        update();
        requestAnimationFrame(loop);
    };
    loop();
    const s = 87,
        w = 83,
        upKey = 80,
        downKey = 76;
    document.addEventListener('keydown', function (event) {

        const keyCode = event.keyCode;
        if (keyCode === downKey)
            box2.ydir = 1;
        else if (keyCode === upKey)
            box2.ydir = -1;
        else if (keyCode === s)
            box1.ydir = -1;

        else if (keyCode === w)
            box1.ydir = 1;
    });
    document.addEventListener('keyup', function (event) {

        const keyCode = event.keyCode;
        if (keyCode === upKey || keyCode === downKey) {
            box2.ydir = 0;
        } else if (keyCode === s || keyCode === w) {
            box1.ydir = 0;
        }
    });
})();