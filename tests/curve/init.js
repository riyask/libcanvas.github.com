LibCanvas.extract();
var ExtendedCurves = {};

atom.dom(function (atom, $) {
	var EC = ExtendedCurves, Grip = EC.Grip, Curve = EC.Curve;
	
	var libcanvas = new LibCanvas('#cnv').start().listenMouse();
	
	var from = new Grip([ 158, 280 ], libcanvas);
	var to   = new Grip([ 388, 270 ], libcanvas);
	var cpFr = new Grip([ 120, 100 ], libcanvas);
	var cpTo = new Grip([ 320, 350 ], libcanvas);
	
	from.link(cpFr);
	to  .link(cpTo);
	
	var curveLayer = libcanvas.createLayer('curve');
	curveLayer.zIndex = 0;
	
	var inverted = $('[name="inverted"]').bind('change', function () {
		curve.setOptions({ inverted: inverted.first.checked });
	});
	
	var curve = new Curve({
		gradient:{
			from:'#c00000',
			to:'#0015FF',
			fn:'linear'
		},
		width:{
			from:40,
			to:10,
			fn:'linear'
		},
		from: from.point,
		to  : to.point,
		points  : [ cpFr.point, cpTo.point ],
		inverted: inverted.first.checked
	});
	
	curveLayer.addElement( curve );
	
	[from, to, cpFr, cpTo].invoke('addEvent', 'update', curveLayer.update);
});