AOS.init();
////////////////////////////////////////////
'use strict';
var multiItemSlider = (function() {
    return function(selector, config) {
        var
            _mainElement = document.querySelector(selector), // основний елемент блока
            _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // врапер для .slider-item
            _sliderItems = _mainElement.querySelectorAll('.slider__item'), // елементи (.slider-item)
            _sliderControls = _mainElement.querySelectorAll('.slider__control'), // елементи управління
            _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
            _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина врапер
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного елемента  
            _positionLeftItem = 0, // позиція лівого активного елемента
            _transform = 0, // значення трансформ .slider_wrapper
            _step = _itemWidth / _wrapperWidth * 100, // велечина кроку для зміни слайду
            _items = [], // масив елементів
            _interval = 0,
            _config = {
                isCycling: false, // автоматична зміна слайдів ???але без нього не працює
                direction: 'right', // напрямок зміни слайдів
                interval: 2000, // інтервал між автоматичною зміною слайда
                pause: false // встановлення паузи при наведенні курсора на слайд
            };

        for (var key in config) {
            if (key in _config) {
                _config[key] = config[key];
            }
        }

        // наполнение массива _items
        _sliderItems.forEach(function(item, index) {
            _items.push({ item: item, position: index, transform: 0 });
        });

        var position = {
            getItemMin: function() {
                var indexItem = 0;
                _items.forEach(function(item, index) {
                    if (item.position < _items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getItemMax: function() {
                var indexItem = 0;
                _items.forEach(function(item, index) {
                    if (item.position > _items[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getMin: function() {
                return _items[position.getItemMin()].position;
            },
            getMax: function() {
                return _items[position.getItemMax()].position;
            }
        }

        var _transformItem = function(direction) {
            var nextItem;
            if (direction === 'right') {
                _positionLeftItem++;
                if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    _items[nextItem].position = position.getMax() + 1;
                    _items[nextItem].transform += _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                _transform -= _step;
            }
            if (direction === 'left') {
                _positionLeftItem--;
                if (_positionLeftItem < position.getMin()) {
                    nextItem = position.getItemMax();
                    _items[nextItem].position = position.getMin() - 1;
                    _items[nextItem].transform -= _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                _transform += _step;
            }
            _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        var _cycle = function(direction) {
            if (!_config.isCycling) {
                return;
            }
            _interval = setInterval(function() {
                _transformItem(direction);
            }, _config.interval);
        }

        // обработчик события click для кнопок "назад" и "вперед"
        var _controlClick = function(e) {
            if (e.target.classList.contains('slider__control')) {
                e.preventDefault();
                var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
                _transformItem(direction);
                clearInterval(_interval);
                _cycle(_config.direction);
            }
        };

        var _setUpListeners = function() {
            // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
            _sliderControls.forEach(function(item) {
                item.addEventListener('click', _controlClick);
            });
            if (_config.pause && _config.isCycling) {
                _mainElement.addEventListener('mouseenter', function() {
                    clearInterval(_interval);
                });
                _mainElement.addEventListener('mouseleave', function() {
                    clearInterval(_interval);
                    _cycle(_config.direction);
                });
            }
        }

        // инициализация
        _setUpListeners();
        _cycle(_config.direction);

        return {
            right: function() { // метод right
                _transformItem('right');
            },
            left: function() { // метод left
                _transformItem('left');
            },
            stop: function() { // метод stop
                _config.isCycling = false;
                clearInterval(_interval);
            },
            cycle: function() { // метод cycle 
                _config.isCycling = true;
                clearInterval(_interval);
                _cycle();
            }
        }

    }
}());

var slider = multiItemSlider('.slider', {
        isCycling: true
    })
    ////////////////////////////////////////////


var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) { slideIndex = 1 }
    x[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}


function menuActive() {
    var nav = document.getElementById("topnavId");
    var header = document.getElementById("headerId");

    if (nav.className === "header-topnav", header.className === "header") {
        nav.className += " responsive"
        header.className += " responsive-header"



    } else {
        nav.className = "header-topnav"
        header.className = "header"
    }
}




// $(document).ready(function() {
//     $("#haderId").on("click", "a", function(event) {
//         event.preventDefault();
//         var id = $(this).attr('href'),
//             top = $(id).offset().top;
//         $('body,html').animate({ scrollTop: top }, 1500);
//     });
// });