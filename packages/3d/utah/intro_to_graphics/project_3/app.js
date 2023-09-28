var selPt = null;
var pt = new Array(4);
(function main() {
  $(document).ready(function () {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    pt[0] = document.getElementById('p0');
    pt[1] = document.getElementById('p1');
    pt[2] = document.getElementById('p2');
    pt[3] = document.getElementById('p3');
    pt[0].setAttribute('cx', 0.1 * w);
    pt[0].setAttribute('cy', 0.4 * h);
    pt[1].setAttribute('cx', 0.4 * w);
    pt[1].setAttribute('cy', 0.2 * h);
    pt[2].setAttribute('cx', 0.5 * w);
    pt[2].setAttribute('cy', 0.8 * h);
    pt[3].setAttribute('cx', 0.9 * w);
    pt[3].setAttribute('cy', 0.6 * h);
    $('circle').on('mousedown', function (event) {
      if (!selPt) selPt = event.target;
    });
    $('circle').on('mouseup', function (event) {
      selPt = null;
    });
    $(document).on('mouseleave', function (event) {
      selPt = null;
    });
    $(document).on('mousemove', function (event) {
      if (selPt) {
        selPt.setAttribute('cx', event.clientX);
        selPt.setAttribute('cy', event.clientY);
        UpdateLines();
        UpdatePoints();
        DrawScene();
      }
    });
    $(window).on('resize', function (event) {
      UpdateCanvasSize();
      DrawScene();
    });
    UpdateLines();
    InitWebGL();
    UpdatePoints();
    DrawScene();
  });
  function UpdateLines() {
    var line = new Array(3);
    line[0] = document.getElementById('line0');
    line[1] = document.getElementById('line1');
    line[2] = document.getElementById('line2');
    var x1 = pt[0].getAttribute('cx');
    var y1 = pt[0].getAttribute('cy');
    var d = 'M' + x1 + ',' + y1 + ' C';
    for (var i = 0; i < 3; ++i) {
      var x2 = pt[i + 1].getAttribute('cx');
      var y2 = pt[i + 1].getAttribute('cy');
      line[i].setAttribute('x1', x1);
      line[i].setAttribute('y1', y1);
      line[i].setAttribute('x2', x2);
      line[i].setAttribute('y2', y2);
      d += x2 + ',' + y2 + ' ';
      x1 = x2;
      y1 = y2;
    }
    var c = document.getElementById('curve');
    c.setAttribute('d', d);
  }
})();
