window.onload = function () {
    const Snake = function (width, height) {
        this.width = width || 30 //默认宽度
        this.height = height || 30 //默认高度
        this.gridArr = [] //保存单元格
        this.snakeArr = [] //蛇本体
        this.keyButton = 39 //键盘操作
        this.speed = 10
        this.direction = 'right'
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
            document.onkeydown = this.keyDown
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
        createSnake: function () {
            //初始化蛇
            this.snakeArr = [],
                this.snakeArr.push([1, 1])
            this.gridArr[this.snakeArr[0][0]][this.snakeArr[0][1]].className = "snake_head";
        },
        keyDown: function (event) {
            let e = event || window.event;
            let keycode = e ? e.keyCode : 0;
            if (keycode >= 37 && keycode <= 40) {
                this.keyButton = keycode
            }
            console.log(this.keyButton)
        },
        move: function () {
            //控制函数
            console.log(this.keyButton)
            

        }
    }
    new Snake()
}