/* jshint mocha: true */
'use strict';

var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

var baseFiles = [
  'package.json',
  'bower.json',
  'README.md',
  '.gitignore',
  '.gitattributes',
  '.editorconfig',
  '.bowerrc',
  'Gruntfile.js',
  'grunt/aliases.js',
  'grunt/browserSync.js',
  'grunt/clean.js',
  'grunt/copy.js',
  'grunt/imagemin.js',
  'grunt/newer.js',
  'grunt/usemin.js',
  'grunt/useminPrepare.js',
  'grunt/watch.js',
  'grunt/wiredep.js',
  'app/index.html',
  'app/css/',
  'app/js/',
  'app/img/'
];
var optionFiles = [
  '.csslintrc',
  '.jshintrc',
  '.jscsrc',
  '.ftppass',
  '.yo-rc.json',
  'grunt/buildcontrol.js',
  'grunt/coffee.js',
  'grunt/csslint.js',
  'grunt/filerev.js',
  'grunt/ftp-deploy.js',
  'grunt/htmllint.js',
  'grunt/htmlmin.js',
  'grunt/jasmine.js',
  'grunt/jscs.js',
  'grunt/jshint.js',
  'grunt/less.js',
  'grunt/mocha.js',
  'grunt/modernizr.js',
  'grunt/postcss.js',
  'grunt/pug.js',
  'grunt/sass.js',
  'grunt/sprite.js',
  'grunt/ssi.js',
  'grunt/stylus.js',
  'grunt/webfont.js',
  'app/index.pug',
  'app/_sass/',
  'app/_less/',
  'app/_stylus/',
  'app/_coffee/',
  'app/inc/',
  'app/img/_sprites/',
  'app/img/_glyphs/'
];
var baseFileContents = [
  ['package.json', /"name": "temp"/],
  ['bower.json', /"name": "temp"/],
  ['README.md', /Temp/]
];
var optionFileContents = [
  ['package.json', /"autoprefixer"/],
  ['package.json', /"grunt-build-control"/],
  ['package.json', /"grunt-contrib-coffee"/],
  ['package.json', /"grunt-contrib-csslint"/],
  ['package.json', /"grunt-contrib-cssmin"/],
  ['package.json', /"grunt-contrib-htmlmin"/],
  ['package.json', /"grunt-contrib-jasmine"/],
  ['package.json', /"grunt-contrib-jshint"/],
  ['package.json', /"grunt-contrib-less"/],
  ['package.json', /"grunt-contrib-pug"/],
  ['package.json', /"grunt-contrib-stylus"/],
  ['package.json', /"grunt-contrib-uglify"/],
  ['package.json', /"grunt-filerev"/],
  ['package.json', /"grunt-ftp-deploy"/],
  ['package.json', /"grunt-html"/],
  ['package.json', /"grunt-jscs"/],
  ['package.json', /"grunt-mocha"/],
  ['package.json', /"grunt-modernizr"/],
  ['package.json', /"grunt-postcss"/],
  ['package.json', /"grunt-sass"/],
  ['package.json', /"grunt-spritesmith"/],
  ['package.json', /"grunt-ssi"/],
  ['package.json', /"grunt-webfont"/],
  ['bower.json', /"modernizr"/],
  ['.gitignore', /\.ftppass/],
  ['grunt/aliases.js', /'(.*:)?coffee(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?csslint(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?filerev(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?htmllint(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?htmlmin(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?jasmine(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?jscs(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?jshint(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?less(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?mocha(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?modernizr(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?postcss(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?pug(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?sass(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?sprite(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?ssi(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?stylus(:.*)?'/],
  ['grunt/aliases.js', /'(.*:)?webfont(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?csslint(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?coffee(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?htmllint(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?jscs(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?jshint(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?less(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?postcss(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?pug(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?sass(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?sprites(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?ssi(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?stylus(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?test(:.*)?'/],
  ['grunt/watch.js', /'(.*:)?webfont(:.*)?'/],
  ['app/index.html', /sprites\.css/],
  ['app/index.html', /glyphs\.css/],
  ['app/index.html', /modernizr\.js/]
];

function runWithPrompts(prompts, callback) {
  helpers.run(path.join(__dirname, '../generators/app'))
    .inDir(path.join(__dirname, 'temp'))
    .withGenerators([
      [helpers.createDummyGenerator(), 'mocha:app'],
      [helpers.createDummyGenerator(), 'jasmine:app']
    ])
    .withPrompts(prompts)
    .on('end', callback);
}

describe('Generator', function () {
  this.timeout(10000);

  describe('with default options', function () {
    before(function (done) {
      runWithPrompts({
        name: 'Test Project'
      }, done);
    });

    it('creates expected package files', function () {
      assert.fileContent([
        ['package.json', /"name": "test-project"/],
        ['bower.json', /"name": "test-project"/],
        ['README.md', /Test Project/]
      ]);
    });
  });

  describe('with minimum preset', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'minimum'
      }, done);
    });

    it('creates expected files', function () {
      assert.file(baseFiles);
      assert.noFile(optionFiles);
      assert.fileContent(baseFileContents);
      assert.noFileContent(optionFileContents);
    });
  });

  describe('with standard preset', function () {
    before(function (done) {
      runWithPrompts({
      }, done);
    });

    it('creates expected files', function () {
      assert.file(baseFiles.concat([
        '.csslintrc',
        '.jshintrc',
        '.jscsrc',
        'grunt/csslint.js',
        'grunt/filerev.js',
        'grunt/htmlmin.js',
        'grunt/jscs.js',
        'grunt/jshint.js',
        'grunt/postcss.js',
        'grunt/sprite.js',
        'app/img/_sprites/'
      ]));
    });
  });

  describe('with "pug" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        markup: 'pug'
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/pug.js',
        'app/index.pug'
      ]);
      assert.noFile([
        'app/index.html'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-contrib-pug"/],
        ['grunt/aliases.js', /'(.*:)?pug(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?pug(:.*)?'/]
      ]);
      assert.noFileContent([
        ['app/index.pug', /sprites\.css/],
        ['app/index.pug', /glyphs\.css/],
        ['app/index.pug', /modernizr\.js/]
      ]);
    });
  });

  describe('with "pug" + assets option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        markup: 'pug',
        utilities: ['sprite', 'webfont'],
        libraries: ['modernizr']
      }, done);
    });

    it('creates expected files', function () {
      assert.fileContent([
        ['app/index.pug', /sprites\.css/],
        ['app/index.pug', /glyphs\.css/],
        ['app/index.pug', /modernizr\.js/]
      ]);
    });
  });

  describe('with "sass" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        style: 'sass'
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/sass.js',
        'app/_sass/'
      ]);
      assert.noFile([
        'app/css/'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-sass"/],
        ['grunt/aliases.js', /'(.*:)?sass(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?sass(:.*)?'/]
      ]);
    });
  });

  describe('with "less" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        style: 'less'
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/less.js',
        'app/_less/'
      ]);
      assert.noFile([
        'app/css/'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-contrib-less"/],
        ['grunt/aliases.js', /'(.*:)?less(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?less(:.*)?'/]
      ]);
    });
  });

  describe('with "stylus" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        style: 'stylus'
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/stylus.js',
        'app/_stylus/'
      ]);
      assert.noFile([
        'app/css/'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-contrib-stylus"/],
        ['grunt/aliases.js', /'(.*:)?stylus(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?stylus(:.*)?'/]
      ]);
    });
  });

  describe('with "coffee" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        script: 'coffee'
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/coffee.js',
        'app/_coffee/'
      ]);
      assert.noFile([
        'app/js/'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-contrib-coffee"/],
        ['grunt/aliases.js', /'(.*:)?coffee(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?coffee(:.*)?'/],
      ]);
    });
  });

  describe('with "autoprefixer" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        utilities: ['autoprefixer']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/postcss.js'
      ]);
      assert.fileContent([
        ['package.json', /"autoprefixer"/],
        ['package.json', /"grunt-postcss"/],
        ['grunt/aliases.js', /'(.*:)?postcss(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?postcss(:.*)?'/]
      ]);
    });
  });

  describe('with "sprite" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        utilities: ['sprite']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/sprite.js',
        'app/img/_sprites/'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-spritesmith"/],
        ['grunt/aliases.js', /'(.*:)?sprite(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?sprite(:.*)?'/],
        ['app/index.html', /sprites\.css/]
      ]);
    });
  });

  describe('with "webfont" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        utilities: ['webfont']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/webfont.js',
        'app/img/_glyphs/'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-webfont"/],
        ['grunt/aliases.js', /'(.*:)?webfont(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?webfont(:.*)?'/],
        ['app/index.html', /glyphs\.css/]
      ]);
    });
  });

  describe('with "htmllint" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        testing: ['htmllint']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/htmllint.js'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-html"/],
        ['grunt/aliases.js', /'(.*:)?htmllint(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?htmllint(:.*)?'/]
      ]);
    });
  });

  describe('with "csslint" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        testing: ['csslint']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/csslint.js',
        '.csslintrc'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-contrib-csslint"/],
        ['grunt/aliases.js', /'(.*:)?csslint(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?csslint(:.*)?'/]
      ]);
    });
  });

  describe('with "jshint" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        testing: ['jshint']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/jshint.js',
        '.jshintrc'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-contrib-jshint"/],
        ['grunt/aliases.js', /'(.*:)?jshint(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?jshint(:.*)?'/]
      ]);
    });
  });

  describe('with "jscs" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        testing: ['jscs']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/jscs.js',
        '.jscsrc'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-jscs"/],
        ['grunt/aliases.js', /'(.*:)?jscs(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?jscs(:.*)?'/]
      ]);
    });
  });

  describe('with "jscs" + "coffee" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        script: 'coffee',
        testing: ['jscs']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        '.jscsrc'
      ]);
      assert.noFileContent([
        ['.jscsrc', /"preset"/]
      ]);
    });
  });

  describe('with "mocha" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        testing: ['mocha']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/mocha.js'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-mocha"/],
        ['grunt/aliases.js', /'(.*:)?mocha(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?test(:.*)?'/]
      ]);
    });
  });

  describe('with "jasmine" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        testing: ['jasmine']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/jasmine.js'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-contrib-jasmine"/],
        ['grunt/aliases.js', /'(.*:)?jasmine(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?test(:.*)?'/]
      ]);
    });
  });

  describe('with "ssi" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        server: ['ssi']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/ssi.js',
        'app/inc/'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-ssi"/],
        ['grunt/aliases.js', /'(.*:)?ssi(:.*)?'/],
        ['grunt/watch.js', /'(.*:)?ssi(:.*)?'/]
      ]);
    });
  });

  describe('with "modernizr" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        libraries: ['modernizr']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/modernizr.js'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-modernizr"/],
        ['bower.json', /"modernizr"/],
        ['grunt/aliases.js', /'(.*:)?modernizr(:.*)?'/],
        ['app/index.html', /modernizr\.js/]
      ]);
    });
  });

  describe('with "htmlmin" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        optimization: ['htmlmin']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/htmlmin.js'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-contrib-htmlmin"/],
        ['grunt/aliases.js', /'(.*:)?htmlmin(:.*)?'/]
      ]);
    });
  });

  describe('with "cssmin" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        optimization: ['cssmin']
      }, done);
    });

    it('creates expected files', function () {
      assert.fileContent([
        ['package.json', /"grunt-contrib-cssmin"/],
        ['grunt/aliases.js', /'(.*:)?cssmin(:.*)?'/]
      ]);
    });
  });

  describe('with "uglify" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        optimization: ['uglify']
      }, done);
    });

    it('creates expected files', function () {
      assert.fileContent([
        ['package.json', /"grunt-contrib-uglify"/],
        ['grunt/aliases.js', /'(.*:)?uglify(:.*)?'/]
      ]);
    });
  });

  describe('with "rev" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        optimization: ['rev']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/filerev.js'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-filerev"/],
        ['grunt/aliases.js', /'(.*:)?filerev(:.*)?'/]
      ]);
    });
  });

  describe('with "buildcontrol" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        distribution: ['buildcontrol']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/buildcontrol.js'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-build-control"/]
      ]);
    });
  });

  describe('with "ftp" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        distribution: ['ftp']
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        'grunt/ftp-deploy.js',
        '.ftppass'
      ]);
      assert.fileContent([
        ['package.json', /"grunt-ftp-deploy"/],
        ['.gitignore', /\.ftppass/]
      ]);
    });
  });

  describe('with "store" option', function () {
    before(function (done) {
      runWithPrompts({
        configType: 'custom',
        store: true
      }, done);
    });

    it('creates expected files', function () {
      assert.file([
        '.yo-rc.json'
      ]);
    });
  });
});
