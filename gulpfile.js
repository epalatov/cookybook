var gulp = require('gulp'),
    sass = require('gulp-sass'), //Подключаем Sass пакет
    jade = require('gulp-jade'), //Подключаем Jade пакет
    browserSync = require('browser-sync'),//Подключаем LiveReload
    concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename      = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del         = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin    = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant    = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache       = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('scss', function(){ // Создаем таск "sass"
  return gulp.src('./src/scss/*.scss') // Берем источник
    .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
    .pipe(gulp.dest('./css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('jade', function(){ // Создаем таск "jade"
  gulp.src('./src/jade/index.jade') // Берем источник
    .pipe(jade({
      pretty: true
    })) // Преобразуем Jade в html посредством gulp-jade
    .pipe(gulp.dest('./')) // Выгружаем результата в папку app
    .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('vendor-scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'libs/jquery/dist/jquery.min.js', // Берем jQuery
        'libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('js/')); // Выгружаем в папку app/js
});

gulp.task('custom-scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js')) // Собираем их в кучу в новом файле main.min.js
        //.pipe(uglify())
        .pipe(gulp.dest('js/')); // Выгружаем в папку js
});

gulp.task('css-libs', ['scss'], function() {
    return gulp.src('css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('css/')); // Выгружаем в папку app/css
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: './', // Директория для сервера - app
        },
        //proxy: 'localhost/cookybook',
        notify: false // Отключаем уведомления
    });
});


gulp.task('watch', ['browser-sync', 'scss','jade','vendor-scripts','custom-scripts', 'css-libs'], function() {
    gulp.watch('src/scss/**/*.scss', ['scss']); // Наблюдение за sass файлами
    gulp.watch('src/jade/**/*.jade', ['jade']); // Наблюдение за Jade файлами
    gulp.watch('src/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами

});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean','scss','vendor-scripts','custom-scripts', 'img'], function() {

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'css/main.css',
        'css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);
gulp.task('clear', function () {
    return cache.clearAll();
});
