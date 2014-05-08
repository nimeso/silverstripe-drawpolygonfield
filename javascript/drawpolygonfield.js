//jQuery( document ).ready(function() {
function drawInit(){
		console.log("yes");
	
        var canvas = document.getElementById("$NamePolyCanvas"),
            ctx = canvas.getContext("2d"),
            offset = jQuery("#$NamePolyCanvas").offset(),
            storedLines = [],
            polyLines = [],
            start = {x: 0, y: 0},
            radius = 4,
            canDraw = true;

        function canvasPosition(e) {
        	console.log(jQuery(".cms-content-fields").scrollTop());
            return {
                x: parseInt(e.clientX - offset.left),
                y: parseInt(e.clientY - offset.top + jQuery(".cms-content-fields").scrollTop())
            };
        }
        
        
        if(jQuery("input#Form_ItemEditForm_$Name").val()){
        	var orgPointsStr = jQuery("input#Form_ItemEditForm_$Name").val();
        	var orgPointsRaw = orgPointsStr.split(",");
        	var orgPoints = orgPointsRaw.filter(function(v){return v!==''});
        	
        	var xs = true;
        	polyLines = [];
        	var inners = [];
        	for(var t=0; t<orgPoints.length; t++ ){
        		if(xs){
        			var point = [];
        			point.x = Number(orgPoints[t]);
        			xs = false;
        		}else{
        			point.y = Number(orgPoints[t]);
        			inners.push(point);
        			xs = true;
        		}
        	}
        	polyLines.push(inners);
        	//console.log(polyLines);
        	draw();
        }
		
        jQuery("#$NamePolyCanvas").mousedown(function (e) {
        	if(canDraw){
	            var pos = canvasPosition(e);
	            if (hitStartCircle(pos)) {
	                polyLines.push(storedLines);
	                storedLines = [];
	                draw();
	            }
	            else
	            {
	                storedLines.push(pos);
	                update(pos);
	            }
	            var input = jQuery("input#Form_ItemEditForm_$Name");
	            var orgVal = input.val();
	            input.val(orgVal+pos.x+","+pos.y+",");
        	}
        })
        .mousemove(function (e) {
            update(canvasPosition(e));
        });

        // Draw completed polylines
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            console.log(polyLines);
            jQuery.each(polyLines, function (idx, polyLine) {
                fillPolyline(polyLine);
            });
        }

        // Update shape currently being drawn
        function update(position) {
            var len = storedLines.length;
            if(len==0) return;

            draw();
            ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.arc(storedLines[0].x, storedLines[0].y, radius, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.strokeStyle = "orange";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(storedLines[0].x, storedLines[0].y);
            
            for(var i=1; i<len; ++i) {
                ctx.lineTo(storedLines[i].x, storedLines[i].y)
            }
            ctx.lineTo(position.x, position.y);

            ctx.stroke();
        };

        function hitStartCircle(pos) {
        	
            var start = storedLines[0] || {x:0, y:0},
                dx = pos.x - start.x,
                dy = pos.y - start.y;
        	
            return (dx * dx + dy * dy < radius * radius)
        }

        function fillPolyline(lines) {
        	canDraw = false;
        	
            ctx.strokeStyle = "red";
            ctx.fillStyle = "rgba(215, 18, 18, 0.5)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(lines[0].x, lines[0].y);

            for (var i = 0; i < lines.length; i++) {
                ctx.lineTo(lines[i].x, lines[i].y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        jQuery("#clearpoly").live("click",function () {
            polyLines = [];
            jQuery("input#Form_ItemEditForm_$Name").val("");
            canDraw = true;
            draw();
        });
}
//});