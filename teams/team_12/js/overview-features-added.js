// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

var bar = new ProgressBar.Circle(featuresAdded1, {
  color: '#0ff',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#0ff', width: 1 },
  to: { color: '#fff', width: 4 },
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
  color: '#ff0',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#ff0', width: 1 },
  to: { color: '#fff', width: 4 },
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
  color: '#f0f',
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#f0f', width: 1 },
  to: { color: '#fff', width: 4 },
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