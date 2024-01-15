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
    var resultR9 = resultR6 * 0.15; // $1
    if (resultR8 > 99 && k >= 2) {
    resultR8 = resultR6 * 0.15 * k * 0.9;//скидка massa*byn/g*0.9(-10%)
    document.querySelector('.sale').innerHTML = '-10%';
    } else {
    document.querySelector('.sale').innerHTML = '';
    }
  // Проверка на отрицательные значения
    if (resultR5 < 0 || resultR3 < 0) {
        document.querySelector('.error').innerHTML = '<div class="admonition warning"><p class="admonition-title">Ошибка: объем стенки не может быть больше объема модели, уменьшите толщину стенок или увеличьте размеры вашей модели</p></div>';
    } else {
    document.querySelector('.error').innerHTML = '';
    } 
    document.getElementById('r1').value = (resultR1 / 1000).toFixed(3);
    // document.getElementById('r3').value = (resultR3 / 1000).toFixed(3);
    // document.getElementById('r4').value = (resultR4 / 1000).toFixed(3);
    // document.getElementById('r5').value = (resultR5 / 1000).toFixed(3);
    document.getElementById('r6').value = resultR6.toFixed(0); 
    document.getElementById('r8').value = resultR8.toFixed(2);
    document.getElementById('r9').value = resultR9.toFixed(2);
    }
    document.querySelectorAll('input[name="forma"], #f, #h, #g, #a, #c, #p, #s, #k').forEach(function(el) {
        el.oninput = calc;
    });




    window.addEventListener('DOMContentLoaded', (event) => {
      let isLocked = false;
      let lockButton = document.getElementById('lock');
      lockButton.addEventListener('click', function() {
          isLocked = !isLocked;
          lockButton.innerHTML = isLocked ? '<span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M9.5 11c.8 0 1.5.7 1.5 1.5S10.3 14 9.5 14 8 13.3 8 12.5 8.7 11 9.5 11m5 8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5m-5.3.2-1.4-1.4 7.1-7.1 1.4 1.4-7.1 7.1M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6h2c0-1.7 1.3-3 3-3s3 1.3 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m0 12H6V10h12v10Z"></path></svg></span>' : '<span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.5 11c.8 0 1.5.7 1.5 1.5S8.3 14 7.5 14 6 13.3 6 12.5 6.7 11 7.5 11m5 8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5m-5.3.2-1.4-1.4 7.1-7.1 1.4 1.4-7.1 7.1M18 1c-2.8 0-5 2.2-5 5v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-1V6c0-1.7 1.3-3 3-3s3 1.3 3 3v2h2V6c0-2.8-2.2-5-5-5m-2 9v10H4V10h12Z"></path></svg></span>';
          lockButton.style.color = isLocked ? '' : '#ffd500';
      });
      // Вызовите функцию click() для lockButton
      lockButton.click();
      function updateAll(inputId) {
          if (isLocked) {
              const value1 = document.getElementById(inputId).value;
              document.getElementById('scale_x').value = value1;
              document.getElementById('scale_y').value = value1;
              document.getElementById('scale_z').value = value1;
          }
      }
      document.getElementById('scale_x').addEventListener('input', function() {
          updateAll('scale_x');scale_xyz();calc3d();
      });
      document.getElementById('scale_y').addEventListener('input', function() {
          updateAll('scale_y');scale_xyz();calc3d();
      });
      document.getElementById('scale_z').addEventListener('input', function() {
          updateAll('scale_z');scale_xyz();calc3d();
      });
  });
  






    function sizeplusX() {
      var inputX = document.getElementById('scale_x');
      var currentValueX = parseFloat(inputX.value) || 0;
      inputX.value = (currentValueX + 0.1).toFixed(2);
      var event = new Event('input');
      inputX.dispatchEvent(event);
    }
    function sizeplusY() {
      var inputY = document.getElementById('scale_y');
      var currentValueY = parseFloat(inputY.value) || 0;
      inputY.value = (currentValueY + 0.1).toFixed(2);
      var event = new Event('input');
      inputY.dispatchEvent(event);
    }
    function sizeplusZ() {
      var inputZ = document.getElementById('scale_z');
      var currentValueZ = parseFloat(inputZ.value) || 0;
      inputZ.value = (currentValueZ + 0.1).toFixed(2);
      var event = new Event('input');
      inputZ.dispatchEvent(event);
    }
    function sizeminusX() {
      var inputX = document.getElementById('scale_x');
      var currentValueX = parseFloat(inputX.value) || 0;
      inputX.value = (currentValueX - 0.1).toFixed(2);
      var event = new Event('input');
      inputX.dispatchEvent(event);
    }
    function sizeminusY() {
      var inputY = document.getElementById('scale_y');
      var currentValueY = parseFloat(inputY.value) || 0;
      inputY.value = (currentValueY - 0.1).toFixed(2);
      var event = new Event('input');
      inputY.dispatchEvent(event);
    }
    function sizeminusZ() {
      var inputZ = document.getElementById('scale_z');
      var currentValueZ = parseFloat(inputZ.value) || 0;
      inputZ.value = (currentValueZ - 0.1).toFixed(2);
      var event = new Event('input');
      inputZ.dispatchEvent(event);
    }

    function scale_xyz() {
      var scale_x = document.getElementById('scale_x').value;
      var scale_y = document.getElementById('scale_y').value;
      var scale_z = document.getElementById('scale_z').value;
  
      scale_x = scale_x ? parseFloat(scale_x) : 1;
      scale_y = scale_y ? parseFloat(scale_y) : 1;
      scale_z = scale_z ? parseFloat(scale_z) : 1;
  
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
  
  massa = volume * ds * dp/1000;//massa 1
  
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
total1pt = (massa).toFixed(1) * 0.15;//massa*byn/g
if (dk >= 2 && price >= 100 ) {
  total = (massa).toFixed(1) * 0.15 * 0.9 * dk;//скидка massa*byn/g*0.9(-10%)
  document.querySelector('.sale').innerHTML = '<div style="color:#13bfa6">-10%</div>';
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
  document.getElementById('total1pt').value = total1pt.toFixed(2);
  };

  // Обработчики событий для кнопок
document.querySelectorAll('.increment-btn').forEach(function(button) {
  button.addEventListener('click', function() {
      var input = document.querySelector('#' + this.dataset.input);
      var step = parseFloat(this.dataset.step);
      input.value = parseFloat(input.value || 0) + step;
      calc3d();
      calc();
  });
});

  document.querySelectorAll('input[name="3dt"], select[name="3dt"], #ds, #dk, #dp, #dc').forEach(function(el) {
    el.oninput = calc3d;});