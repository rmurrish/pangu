let bamboos = [];
let pandas = [];


function setup() {
	createCanvas(windowWidth-50,windowHeight-50);
	erase();
	
	for (i in [1,2,3,4,1,2,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]){
		bamboos.push(new bamboo);
	}
	pandas.push(new panda);
}



function erase() {
	background(225,255,200);
	}

class panda {
	constructor() {
		this.loc = createVector(width/2,4*height/5);
		this.size = 75;
		this.mouthColor = color(200,100,75);
		this.open = false;
	}
	
	openMouth() {
		this.open = true;
	}
	
	closeMouth() {
		this.open = false;
	}
	
	left() {
		this.loc.x -= width/200;
		if (this.loc.x < 0) {
			this.loc.x = 0;
		}
	}
	
	right() {
		this.loc.x += width/200;
		if (this.loc.x > width) {
			this.loc.x = width;
		}
	}
	
	render() {
		stroke(20);
		strokeWeight(size/100);	
		fill(240);
		ellipse(this.loc.x,this.loc.y,this.size,this.size*0.9);
		noStroke();
		fill(20);
		ellipse(this.loc.x-this.size*0.33,this.loc.y-this.size/2.7,this.size/3,this.size/3);
		ellipse(this.loc.x+this.size*0.33,this.loc.y-this.size/2.7,this.size/3,this.size/3);
		ellipse(this.loc.x-this.size*0.14,this.loc.y-this.size/10	,this.size/5,this.size/5);
		ellipse(this.loc.x+this.size*0.14,this.loc.y-this.size/10,this.size/5,this.size/5);
		ellipse(this.loc.x,this.loc.y+this.size/11,this.size/7,this.size/9);
		
		if (this.open) {
			fill(this.mouthColor);
			ellipse(this.loc.x,this.loc.y+this.size/3.3,this.size/6,this.size/4);
		}
		else {
			fill	(30);
			ellipse(this.loc.x,this.loc.y+this.size/4.8,this.size/6,this.size/20);
		}
	}
}



class bamboo {	
	
	constructor() {
		this.color = color(100,200,75);
		this.stroke = color(220,220,50);
		//treat as root x, age, z depth
		this.loc = createVector(random(width),random(height,6*height/5));
		this.age = random(44);
		this.depth = random(-3,3);
		this.angle = random(-1*QUARTER_PI,QUARTER_PI)*0.1;
	}

	chomp(position) {
		if (abs(this.loc.x - position) < width/30) {
			this.age = 1;
			this.depth = random(-3,3);
			this.angle = random(-1*QUARTER_PI,QUARTER_PI)*0.1;
			this.loc.x = random(width);	
		}
	}
	
	render() {
		strokeWeight((this.loc.z + 3)/2);
		stroke(this.stroke);
		fill(this.color);
		
		this.age += random(0.3);
		this.sectionHeight = (this.depth+3)*this.age/2;
		
		push();
		rotate(this.angle);
		rect(this.loc.x,this.loc.y,this.sectionHeight/5,this.sectionHeight);
		//fill('red');
		var n = 0;
		while (n < min(10,this.age/20)) {
			rect(this.loc.x,this.loc.y-this.sectionHeight*n,this.sectionHeight/5,this.sectionHeight);
			n++;
		}
		//var l = 0;
		//while (l < 3){
		//	push();
		//	rotate(QUARTER_PI-(0.2*l));
		//	ellipse(this.loc.x,this.loc.y-this.sectionHeight*(n-1),4,40);
		//	l++;
		//	pop();
		//}
		pop();
	}
	
}


function draw() {
	erase();
	
	for (bamboo of bamboos){
		bamboo.render();
	}
	for (panda of pandas){
		if (keyIsDown(32)) {
			panda.openMouth();
			for (bamboo of bamboos){
				//console.log(panda.loc.x);
				bamboo.chomp(panda.loc.x);
			}
		}
		else if (keyIsDown(LEFT_ARROW)) {
			panda.left();
			panda.closeMouth();
		}
		else if (keyIsDown(RIGHT_ARROW)) {
			panda.right();
			panda.closeMouth();
		}
		else {
			panda.closeMouth();	
		}
		panda.render();
	}
	
	
}