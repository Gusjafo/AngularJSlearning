console.log('Proyecto AngularJS');

angular.module('miApp', ['ngSanitize', 'ngAnimate']) /* entre corchetes pongo las librerias agregadas */
    .controller('miCtrl1', function ($scope, $filter) {

        /*  PROPIEDADES */

        $scope.mensaje = $filter('uppercase')('Hola soy un mensaje desde el controlador 1')
        $scope.numero = $filter('number')(1234.5678, 2)
        $scope.mensajeTexto = 'Mensaje en formato texto'
        $scope.mensajeHTML = '<i>Mensaje en formato HTML</i>'
        $scope.mostrar2 = true
        $scope.valor1 = 123
        $scope.valor2 = 456
        $scope.check = true
        $scope.personas = [
            'Pablo',
            'Ana',
            'Pedro',
            'Diego',
            'Maria',
            'Mauro'
        ]
        $scope.alumnos = [
            { nombre: 'Diego', apellido: 'Perez', edad: 24, curso: true, cuota: 1354.32, altura: 1.78, foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-256.png' },
            { nombre: 'Pablo', apellido: 'Mei', edad: 32, curso: false, cuota: 1234.56, altura: 1.69, foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/2_avatar-256.png' },
            { nombre: 'Lucia', apellido: 'Gutierrez', edad: 29, curso: true, cuota: 5678.21, altura: 1.71, foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/4_avatar-256.png' },
            { nombre: 'Gaby', apellido: 'Gomez', edad: 22, curso: false, cuota: 1734.78, altura: 1.62, foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-256.png' },
            { nombre: 'Ernesto', apellido: 'Pancreateli', edad: 98, curso: false, cuota: 9887.238, altura: 1.35, foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/12_avatar-256.png' }
        ]

        $scope.contador2 = 456

        /* filtros iterativos */
        $scope.cantidad = ''
        $scope.orden = ''
        $scope.inverso = false        
        $scope.ordenar = function (campo) {
            $scope.orden = ($scope.inverso ? '-' : '') + campo
        }
        $scope.busqueda = ''
        $scope.busqueda2 = ''
        $scope.edadMin = ''
        $scope.edadMax = ''
        $scope.skip = ''
        $scope.cant = ''

        /* --------------------------------------  */
        /*               METODOS                          */
        /* -------------------------------------- */

        $scope.incrementar = function () {
            $scope.contador2++
        }

        $scope.getContador = function () {
            return $scope.contador2
        }

        $scope.borrarAlumno = function (index) {
            console.log('Borrar: ', index)
            $scope.alumnos.splice(index, 1)
        }

        $scope.agregarAlumno = function () {
            var alumno = { nombre: 'Hernan', apellido: 'Catriel', edad: 45, curso: false, cuota: 2568.45, altura: 1.92, foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/1_avatar-256.png' }

            $scope.alumnos.push(alumno)
        }

        $scope.alumnosCurso = function () {
            var cant = 0;
            angular.forEach($scope.alumnos, function (alumno, index) {
                if (alumno.curso) {
                    cant++
                }
            });
            return {
                cantidad: cant,
                total: $scope.alumnos.length,
                ningun: cant == 0,
                todos: cant == $scope.alumnos.length
            }
        }

        $scope.aplicarEstilo = function (curso) {
            return {
                backgroundColor: curso? 'green': 'red',
                color: 'white',
                padding: '5px',
                borderRadius: '5px',
                'margin-right': '10px'
            }
        }

    })
    .filter('micurrency', function () {
        return function (text, simbolo) {
            return simbolo + text
        }
    })
    .filter('capitalize', function () {
        return function (text) {
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        }
    })
    .filter('acortar', function () {
        return function (text, max) {
            if (text.length > max) {
                return text.substring(0, max) + ' ...'
            }
            else {
                return text
            }

        }
    })
    .filter('wrap', function () {
        return function (text, start, end) {
            return start + text + end
        }
    })
    .filter('skipLimitTo', function () {
        return function (arr, start, cant) {
            if(start == '') start = 0
            if(cant == '') cant = arr.length
            start = parseInt(start)
            cant = parseInt(cant)
            return arr.slice(start, start + cant)
        }
    })
    .filter('edad', function () {
        return function (arr, min, max) {
            if (min == '') {
                min = 0
            }
            if (max == '') {
                max = 120
            }
            
            return arr.filter(alumno => alumno.edad >= min && alumno.edad <= max)
        }
    })

    /* -------------------------------------- */
    /*               controlador 2                     */
    /* -------------------------------------- */


    .controller('miCtrl2', function ($scope, $window) {
        $scope.mensaje = 'Hola soy un mensaje desde el controlador 2'

        var refParrafo = $window.document.getElementById('parrafo')

        refParrafo.onmouseover = function () {
            console.log('el mouse paso por aqui')
            refParrafo.classList.remove('alert-warning')
            refParrafo.classList.add('alert-success')
        }

        refParrafo.onmouseleave = function () {
            console.log('el mouse salio de aqui')
            refParrafo.classList.remove('alert-success')
            refParrafo.classList.add('alert-warning')
        }
    })