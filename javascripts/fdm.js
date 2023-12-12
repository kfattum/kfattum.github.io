  function calc() {
  // Получение значений из формы
    var j = parseFloat(document.querySelector('input[name="forma"]:checked').value);
    var f = parseFloat(document.getElementById('f').value);
    var h = parseFloat(document.getElementById('h').value);
    var g = parseFloat(document.getElementById('g').value);
    var a = parseFloat(document.getElementById('a').value);
    var c = parseFloat(document.getElementById('c').value);
    var p = parseFloat(document.getElementById('p').value);
    var k = parseFloat(document.getElementById('k').value);
    var s = parseFloat(document.getElementById('s').value) / 100;
    var resultR1 = 0;
    var resultR3 = 0;
    var resultR4 = 0;
    var resultR5 = 0;
    var resultR6 = 0;
    var resultR8 = 0;
  // Расчет объема шара
    if (j == 100) {
    resultR1 += (4/3) * 3.14159 * Math.pow((a/2), 3); //Объем модели, мм3
    resultR3 += (4/3) * 3.14159 * Math.pow(((a/2)-c), 3); //Объем заполнения, мм3
    } 
  // Объем параллелепипеда
    if (j == 200) {
    resultR1 += f * h * g;
    resultR3 += (f-2*c) * (h-2*c) * (g-2*c);
    } 
  // Объем эллипсоида
    if (j == 300) {
    resultR1 += (4/3) * 3.14159 * (f/2) * (h/2) * (g/2);
    resultR3 += (4/3) * 3.14159 * ((f-2*c)/2) * ((h-2*c)/2) * ((g-2*c)/2);
    } 
  // Объем цилиндра
    if (j == 400) {
    resultR1 += 3.14159 * Math.pow((a/2), 2) * g;
    resultR3 += 3.14159 * Math.pow((a/2-c), 2) * (g-c*2);
    }
    var resultR4 = resultR1-resultR3; // Объем стенки, мм3
    var resultR5 = resultR3 * s; // Объем заполнения, мм3 %
    var resultR6 = ((p*resultR5)+(p*resultR4))/1000; // Масса, г
    var resultR8 = resultR6 * 0.15 * k; // $
    if (resultR8 > 99 && k >= 2) {
    resultR8 = resultR6 * 0.15 * k * 0.7;//скидка massa*byn/g*0.7(-30%)
    document.querySelector('.sale').innerHTML = '-30%';
    } else {
    document.querySelector('.sale').innerHTML = '';
    }
  // Проверка на отрицательные значения
    if (resultR5 < 0 || resultR3 < 0) {
        document.querySelector('.error').innerHTML = 'Ошибка: объем стенки не может быть больше объема модели, уменьшите толщину стенок или увеличьте размеры вашей модели';
    } else {
    document.querySelector('.error').innerHTML = '';
    } 
    document.getElementById('r1').value = (resultR1 / 1000).toFixed(3);
    // document.getElementById('r3').value = (resultR3 / 1000).toFixed(3);
    // document.getElementById('r4').value = (resultR4 / 1000).toFixed(3);
    // document.getElementById('r5').value = (resultR5 / 1000).toFixed(3);
    document.getElementById('r6').value = resultR6.toFixed(0); 
    document.getElementById('r8').value = resultR8.toFixed(2);
    }
    document.querySelectorAll('input[name="forma"], #f, #h, #g, #a, #c, #p, #s, #k').forEach(function(el) {
        el.oninput = calc;
    });

  function sizeplusX() {
  var inputX = document.getElementById('scale_x');
  var currentValueX = parseFloat(inputX.value) || 0;
  inputX.value = (currentValueX + 0.01).toFixed(2);
  scale_xyz();
  calc3d();
}
  function sizeplusY() {
  var inputY = document.getElementById('scale_y');
  var currentValueY = parseFloat(inputY.value) || 0;
  inputY.value = (currentValueY + 0.01).toFixed(2);
  scale_xyz();
  calc3d();
}
  function sizeplusZ() {
  var inputZ = document.getElementById('scale_z');
  var currentValueZ = parseFloat(inputZ.value) || 0;
  inputZ.value = (currentValueZ + 0.01).toFixed(2);
  scale_xyz();
  calc3d();
}
  function sizeminusX() {
  var inputX = document.getElementById('scale_x');
  var currentValueX = parseFloat(inputX.value) || 0;
  inputX.value = (currentValueX - 0.01).toFixed(2);
  scale_xyz();
  calc3d();
}
  function sizeminusY() {
  var inputY = document.getElementById('scale_y');
  var currentValueY = parseFloat(inputY.value) || 0;
  inputY.value = (currentValueY - 0.01).toFixed(2);
  scale_xyz();
  calc3d();
}
  function sizeminusZ() {
  var inputZ = document.getElementById('scale_z');
  var currentValueZ = parseFloat(inputZ.value) || 0;
  inputZ.value = (currentValueZ - 0.01).toFixed(2);
  scale_xyz();
  calc3d();
}

  function scale_xyz() {
    var scale_x = parseFloat(document.getElementById('scale_x').value);
    var scale_y = parseFloat(document.getElementById('scale_y').value);
    var scale_z = parseFloat(document.getElementById('scale_z').value);

    stl_viewer.set_scale(1, scale_x, scale_y, scale_z);

    calc3d();
    }
    document.querySelectorAll('input[name="scale_xyz"], #scale_x, #scale_y, #scale_z').forEach(function(el) {
        el.oninput = scale_xyz;
    });

  function loaded_sign() {
    document.querySelector('.loaded_sign').innerHTML = '<span class="twemoji load"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0Z"></path></svg></span>';
  }
function delete_sign() {
    setTimeout(function() {
        var element = document.querySelector('.loaded_sign');
        if (element) {
            element.parentNode.removeChild(element);
        }
    }, 1000); // Задержка 
}
  // document.querySelector("#submit").onclick = calc3d;
  function calc3d(){
  delete_sign();
  var info = JSON.stringify(stl_viewer.get_model_info(1));
      
  var dp = parseFloat(document.getElementById('dp').value);//mat
  var dk = parseFloat(document.getElementById('dk').value);//kal
  var ds = parseFloat(document.getElementById('ds').value)/100;//%
  var data = JSON.parse(info);
  var dims = data.dims;
if (dims !== undefined) {
  var size_x = dims.x;
  var size_y = dims.y;
  var size_z = dims.z;
} else {
  console.error('Ошибка: dims не определен');
}
  var volume = data.volume;
  var area = data.area;
  var total = 0;

  massa = volume * ds * dp * 1.1/1000;//massa 1

  var scale_x = parseFloat(document.getElementById('scale_x').value);
if (isNaN(scale_x)) {
  scale_x = 1; // Значение по умолчанию
  console.error('Ошибка: некорректное значение для scale_x');
}
var scale_y = parseFloat(document.getElementById('scale_y').value);
if (isNaN(scale_y)) {
  scale_y = 1; // Значение по умолчанию
  console.error('Ошибка: некорректное значение для scale_y');
}
var scale_z = parseFloat(document.getElementById('scale_z').value);
if (isNaN(scale_z)) {
  scale_z = 1; // Значение по умолчанию
  console.error('Ошибка: некорректное значение для scale_z');
}
price = massa * 0.15 * dk;//$
if (dk >= 2 && price >= 100 ) {
  total = massa * 0.10 * dk;//скидка massa*byn/g*0.7(-30%)
  document.querySelector('.sale').innerHTML = '-30%';
} else {
  total = massa * 0.15 * dk;
  document.querySelector('.sale').innerHTML = '';
};
  document.getElementById('sizex').value = (size_x * scale_x).toFixed(1);
  document.getElementById('sizey').value = (size_y * scale_y).toFixed(1);
  document.getElementById('sizez').value = (size_z * scale_z).toFixed(1);
  
  document.getElementById('area').value = (area/100).toFixed(0); //cm2
  document.getElementById('volume').value = (volume/1000).toFixed(0); //cm3    
  
  document.getElementById('masssa').value = massa.toFixed(0);
  document.getElementById('total').value = total.toFixed(2);
  };
  document.querySelectorAll('input[name="3dt"], select[name="3dt"], #ds, #dk, #dp').forEach(function(el) {
    el.oninput = calc3d;});
  // document.querySelectorAll('input[name="3dt"], #ds, #dk').forEach(function(el) {
  //   el.oninput = calc3d;});