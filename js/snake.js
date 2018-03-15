window.onload = function () {
    const Snake = function (width, height) {
        this.width = width || 10 //默认宽度
        this.height = height || 10 //默认高度
        this.gridArr = [] //保存单元格
        this.snakeArr = [] //蛇本体
        this.foodArr = [] //食物
        this.keyButton = 39 //键盘操作
        this.speed = 10
        this.timer = null //计时器
        this.stop = true//空格
        this.init()
    }
    Snake.prototype = {
        //函数初始化
        init: function () {
            let that = this
            //创建二维数组
            this.gridArr = new Array()
            for (let i = 0; i < this.width; i++) {
                this.gridArr[i] = new Array()
            }
            console.log(this.gridArr)
            this.createMap()
            this.createSnake()
            this.createFood()
            document.onkeydown = this.keyDown.bind(that)
        },
        createMap: function () {
            //初始化地图
            let table = document.createElement("table")
            table.id = "snaketable" //设置表格id
            let tbody = document.createElement("tbody")
            for (let i = 0; i < this.width; i++) {
                let tr = document.createElement('tr')
                for (let j = 0; j < this.height; j++) {
                    let td = document.createElement('td')
                    this.gridArr[i][j] = tr.appendChild(td)
                }
                tbody.appendChild(tr)
            }
            table.appendChild(tbody)
            document.getElementsByClassName('content-wrap')[0].appendChild(table)
        },
        isBody: function (arr) {
            for (let i = 0; i < this.snakeArr.length; i++) {
                if (arr[0] == this.snakeArr[i][0] && arr[1] == this.snakeArr[i][1]) {
                    return true
                }
            }
            return false
        },
        createSnake: function () {
            //初始化蛇
            this.snakeArr = [];
            this.snakeArr.push([1, 3]);
            this.snakeArr.push([1, 2]);
            this.snakeArr.push([1, 1]);
            this.gridArr[this.snakeArr[0][0]][this.snakeArr[0][1]].className = "snake_head";
            this.gridArr[this.snakeArr[1][0]][this.snakeArr[1][1]].className = "snake_body";
            this.gridArr[this.snakeArr[2][0]][this.snakeArr[2][1]].className = "snake_body";
        },
        createFood: function () {
            let food_x = parseInt(this.width * Math.random())
            let food_y = parseInt(this.height * Math.random())
            //检测是否食物生成在蛇身体内
            if (this.isBody([food_x, food_y])) {
                this.createFood()
            } else {
                //绘制食物
                this.foodArr = [food_x, food_y]
                this.gridArr[food_x][food_y].className = "snake_food";
            }
        },
        keyDown: function (event) {
            let e = event || window.event;
            let keycode = e ? e.keyCode : 0;
            if (keycode == 32) { //空格键控制开始/暂停
                if (this.stop) {
                    this.move();
                    this.stop = false;
                } else {
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                    this.stop = true;
                }
            }
            if (keycode >= 37 && keycode <= 40) {
                this.keyButton = keycode
                this.move()
            }
        },
        mount: function () {
            let head_x = this.snakeArr[0][0]
            let head_y = this.snakeArr[0][1]
            switch (this.keyButton) {
                case 37:
                    if (this.pos_y != 1) {
                        this.pos_y = -1;
                        this.pos_x = 0
                    } //防止控制蛇往相反反方向走
                    break;
                case 38:
                    if (this.pos_x != 1) {
                        this.pos_x = -1;
                        this.pos_y = 0
                    }
                    break;
                case 39:
                    if (this.pos_y != -1) {
                        this.pos_y = 1;
                        this.pos_x = 0
                    }
                    break;
                case 40:
                    if (this.pos_x != -1) {
                        this.pos_x = 1;
                        this.pos_y = 0
                    }
            }
            head_x += this.pos_x;
            head_y += this.pos_y;
            if (head_x == this.foodArr[0] && head_y == this.foodArr[1]) {
                //吃到食物
                this.snakeArr.unshift(this.foodArr);
                this.createFood()
                console.log('!!!!')
                this.move()
            } else {
                //去除蛇最后一个部分
                this.gridArr[this.snakeArr[this.snakeArr.length - 1][0]][this.snakeArr[this.snakeArr.length - 1][1]].className = "not";

                for (let i = this.snakeArr.length - 1; i > 0; i--) {
                    this.snakeArr[i] = this.snakeArr[i - 1]
                }
                this.snakeArr[0] = [head_x,head_y];
                console.log(this.snakeArr.length)
            }
            this.drawSnake()
            this.gridArr[head_x][head_y].className = "snake_head";

        },
        move: function () {
            //控制函数
            let that = this;
            if (that.timer) {
                clearInterval(that.timer);
            }
            that.timer = setInterval(that.mount.bind(that), Math.floor(3000 / this.speed));
            console.log(this.keyButton)
        },
        drawSnake: function () {
            //绘制蛇身体
            for (let i = 0; i < this.snakeArr.length; i++) {
                console.log(this.snakeArr.length)
                let snake_temp1 = this.snakeArr[i][0],
                    snake_temp2 = this.snakeArr[i][1];
                this.gridArr[snake_temp1][snake_temp2].className = "snake_body";
            }
        }
    }
    new Snake()
}