window.onload = function () {
    const Snake = function (width, height) {
        this.width = width || 30 //默认宽度
        this.height = height || 30 //默认高度
        this.init()
    }
    Snake.prototype = {
        //函数初始化
        init:function(){
          this.createMap()
        },
        //初始化地图
        createMap: function() {
            let table = document.createElement("table")
            table.id = "snaketable" //设置表格id
            let tbody = document.createElement("tbody")
            for (let i = 0; i < this.width; i++) {
                let tr = document.createElement('tr')
                for (let j = 0; j < this.height; j++) {
                    let td = document.createElement('td')
                    tr.appendChild(td)
                }  
                tbody.appendChild(tr)
            }
            table.appendChild(tbody)
            document.getElementsByClassName('content-wrap')[0].appendChild(table)
        }
    }
    new Snake()
}