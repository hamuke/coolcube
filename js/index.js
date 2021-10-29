var boxBg = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f']; //box背景色
var bodyBg = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#616161']; //body背景色

var len = boxBg.length;

//动态生成结构
var wrap = document.querySelector('#content .wrap');
var htmlStr = '';

for (var i = 1; i <= len; i++) {
    htmlStr += `<div class="box">
    <div>${i}</div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>`;

}
wrap.innerHTML = htmlStr;

//动态生成背景样式
var style = document.createElement('style');
var styleStr = '';

for (var j = 1; j <= len; j++) {
    styleStr += `.box:nth-child(${j}) div{
        background: ${boxBg[j -1]} url(./images/${j}.png) no-repeat center;
    }`;
}
style.innerHTML = styleStr;
document.head.appendChild(style);


// 鼠标移入移出事件
var boxes = document.querySelectorAll('.box');
//根据得到的0 1 2 3选择旋转方向
var rotate = ['rotateX(-180deg)', 'rotateY(-180deg)', 'rotateX(180deg)', 'rotateY(180deg)'];

boxes.forEach(function (box) {
    box.onmouseenter = function (e) {
        // console.log(getDir(e, this));
        var dir = getDir(e, this);
        //先把盒子抽出来，再旋转
        this.style.transform = 'translateZ(150px)' + rotate[dir];

        //改变背景颜色
        document.body.style.background = bodyBg[Math.round(Math.random() * (bodyBg.length - 1))];
    }
    box.onmouseleave = function (e) {
        this.style.transform = '';
    }
});

function getDir(e, box) {
    /* getBoundingClientRect()返回盒模型的信息
	{
		width:,
		height:,
		left:,
		top:,
		right:,
		bottom:,
	} */
    var l = box.getBoundingClientRect().left;
    var t = box.getBoundingClientRect().top;
    var w = box.offsetWidth;
    var h = box.offsetHeight;

    var x = e.clientX - l - w / 2;
    var y = e.clientY - t - h / 2;

    //Math.atan2(y轴的距离,x轴的距离) 这个方法返回两点之间的线段与x轴正方向之间的角度
    var deg = Math.atan2(y, x) / (Math.PI / 180); //转化成角度
    var res = (Math.round((deg + 180) / 90) + 3) % 4; //得到0 1 2 3四个值代表四个方向
    return res;
}


//视角跟随鼠标移动
var content = document.querySelector('#content');
document.onmousemove = function (e) {
    /*
        鼠标往右走，旋转Y轴的正值；往左走旋转y轴的负值 
        鼠标往上走，旋转X轴的正值；往下走旋转x轴的负值
        e.clientY / window.innerHeight 鼠标的位置的值/窗口的值(0~1) 
        0.5是为了将视角移到中心(默认是左上角)
        15是为了让数据更大，看起来效果更好
     */
    var x = (0.5 - e.clientY / window.innerHeight) * 15;
    var y = (e.clientX / window.innerWidth - 0.5) * 15;
    // console.log(x,y);

    content.style.transform = 'perspective(1000px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
}