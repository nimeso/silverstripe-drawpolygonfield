# SilverStripe Draw Polygon Field

Allows you to draw a polygon shape using HTML5 canvas. The x,y points are saved as a comma deleminated string in the database. It also excepts a ArrayList of Image objects that can be rendered in the background of the canvas.

## Usage

In Warehouse.php context:
```php
	// optional images to render
	$images = ArrayList();
	$images->add($someImageObj);
	$images->add($anotherImageObj);

	// create field
	$fields->push(new DrawPolygonField("Points","Points",null,1140,600,$images));
```
