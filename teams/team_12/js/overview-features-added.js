// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

// Wrap in DOMContentLoaded + timeout to ensure container layout (cols, css) complete before ProgressBar measures size -> fixes aspect ratio warnings
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
var bar = new ProgressBar.Circle(featuresAdded1, {
  color: '#ffcc00',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 6,
  trailWidth: 2,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#ffaa00', width: 2 },
  to: { color: '#ffcc00', width: 6 },
  // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value= circle.value();
    //var value = Math.round(circle.value() * 100);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(Math.round(value*35));
    }

  }
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';
bar.text.style.color = '#fff';
bar.text.style.textShadow = '0 0 3px #000';

bar.animate(0.17142857142);  // Number from 0.0 to 1.0

var bar2 = new ProgressBar.Circle(featuresAdded2, {
  color: '#33ff99',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 6,
  trailWidth: 2,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#00cc66', width: 2 },
  to: { color: '#33ff99', width: 6 },
  // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value= circle.value();
    //var value = Math.round(circle.value() * 100);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(Math.round(value*35));
    }

  }
});
bar2.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar2.text.style.fontSize = '2rem';
bar2.text.style.color = '#fff';
bar2.text.style.textShadow = '0 0 3px #000';

bar2.animate(0.54285714285);  // Number from 0.0 to 1.0

var bar3 = new ProgressBar.Circle(featuresAdded3, {
  color: '#ff6699',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 6,
  trailWidth: 2,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#cc3366', width: 2 },
  to: { color: '#ff6699', width: 6 },
  // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value= circle.value();
    //var value = Math.round(circle.value() * 100);
    if (value === 0) {
      circle.setText('');
    } else {
      circle.setText(Math.round(value*35));
    }

  }
});
bar3.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar3.text.style.fontSize = '2rem';
bar3.text.style.color = '#fff';
bar3.text.style.textShadow = '0 0 3px #000';

bar3.animate(1.0);  // Number from 0.0 to 1.0
  }, 50);
});