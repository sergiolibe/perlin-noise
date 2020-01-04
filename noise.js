// console.log("r/place");
let canvas = document.querySelector("canvas");
// console.log(canvas);
let ctx = canvas.getContext("2d");
let cw=600,ch=600;
ctx.canvas.width=cw+1;
ctx.canvas.height=ch+1;
ctx.clearRect(0, 0, cw+1, ch+1);
let nw=41,nh=41;
let dnw=cw/(nw-1),dnh=ch/(nh-1);
// console.log([dnw,dnh]);
let gradientes=[[1,0],[0.707,0.707],[0,1],[-0.707,0.707],[-1,0],[-0.707,-0.707],[0,-1],[0.707,-0.707]];
// gradientes=[[1,1],[-1,1],[1,-1],[-1,-1]];
gradientes = [[0.707,0.707],[-0.707,0.707],[0.707,-0.707],[-0.707,-0.707]];
// gradientes=[[-1,1]];
let nodes=[];
for (var i = 0; i <=nh; i++) {
  nodes[i]=new Array(nw);
  for (var j = 0; j <= nw; j++) {
    nodes[i][j]=[];
  }
}
for (var i = 0; i <= nh; i++) {
  for (var j = 0; j <= nw; j++) {
    nodes[i][j]['x']=dnw*j;
    nodes[i][j]['y']=dnh*i;
    // nodes[i][j]['grad']=gradientes[Math.floor(Math.random() * gradientes.length)];
    let angle=Math.random()*Math.PI*2;
  	// let module=1-(i+j)/(nw+nh);
  	let module=1;
    nodes[i][j]['grad']=[module*Math.cos(angle),module*Math.sin(angle)];
  }
}
// console.log(nodes);

let dotProducts=[]

for (var k = 0; k < 4; k++) {
  dotProducts[k]=new Array(ch);
  for (var j = 0; j < cw; j++) {
    dotProducts[k][j]=new Array(cw);
  }
}
// console.log(dotProducts);

let interpolatedValues=[];
for (var i = 0; i <=ch; i++) {
  interpolatedValues[i]=new Array(cw);
}

// class Gradient(){
//   constructor(x) {
//     this.x=x;
//   }
// }


//line
// let previousFrameTime = 0;
// let FPS;
// let x = 0;
// let r = 20;
// let r2 = 10;
// let xo = 100;
// let yo = 80;
// let xf,
//   yf = 0;
var x=0,yo=0,r,g,b,id = ctx.createImageData(2, 2),canContinue=true,
paso=10,
color=255;
;

let dist=[],ny=0,nx=0,n1,n2,n3,n4,v1,v2,v3,v4,u,v,x1,x2;
let minv1=4,maxv1=-4;
let minv2=4,maxv2=-4;
let minv3=4,maxv3=-4;
let minv4=4,maxv4=-4;
let min_u=2,max_u=-2;
let min_v=2,max_v=-2;

let minx1=2,maxx1=-2;
let minx2=2,maxx2=-2;
let minv=2,maxv=-2;
animate();
// drawGradients();
function animate() {
  // console.log('animating')
  // console.log(id);

  // for (var y = yo; y <= yo+paso&&yo<ch; y++) {
  //   for (var x = 0; x <= cw; x++) {
      
  //     r = Math.floor(Math.random() * color);
  //     g = Math.floor(Math.random() * color);
  //     b = Math.floor(Math.random() * color);
  //     // r = Math.floor(Math.random() * 2)*color;
  //     // g = r;
  //     // b = r;

  //     pintar(x,y,r,g,b);
  //   }
  // }
  // yo+=paso;
  // if(yo<ch) requestAnimationFrame(animate);
  
  for (var y = yo; y < yo+paso&&yo<=ch; y++) {

    for (var x = 0; x <= cw; x++) {
      
      // r = Math.floor(Math.random() * color);
      // g = Math.floor(Math.random() * color);
      // b = Math.floor(Math.random() * color);
      // g = r;
      // r = Math.floor(Math.random() * 2)*color;
      // b = r;
      // if(x==64&&y==73){
        
        // if(x%dnw==0){
        //   nx=(x/dnw>>0);
        //   ny=(y/dnh>>0);
        //   n1=nodes[ny][nx];
        //   n3=nodes[ny+1][nx];
        //   v=((y-n1.y)/(n3.y-n1.y));
        //   v1=v*n1.grad[1];
        //   v3=(v-1)*n3.grad[1];
        //   interpolatedValues[y][x]=fade(lerp(-1,1,lerp_normalized(v1,v3,v)));
          
        // }else if(y%dnh==0){
        //   nx=(x/dnw>>0);
        //   ny=(y/dnh>>0);
        //   n1=nodes[ny][nx];
        //   n2=nodes[ny][nx+1];
        //   u=((x-n1.x)/(n2.x-n1.x));
        //   v1=u*n1.grad[0];
        //   v2=(u-1)*n2.grad[0];
          
        //   interpolatedValues[y][x]=0;

        // }else{
        if(x%dnw!=0 && y%dnh!=0){
          nx=(x/dnw>>0);
          ny=(y/dnh>>0);
          n1=nodes[ny][nx];
          n2=nodes[ny][nx+1];
          n3=nodes[ny+1][nx];
          n4=nodes[ny+1][nx+1];
          // u=((x-n1.x)/(n2.x-n1.x));
          u=lerp(n1.x,n2.x,x)
          // v=((y-n1.y)/(n3.y-n1.y));
          v=lerp(n1.y,n3.y,y);
          v1=u*n1.grad[0]+v*n1.grad[1];
          v2=(u-1)*n2.grad[0]+v*n2.grad[1];
          v3=u*n3.grad[0]+(v-1)*n3.grad[1];
          v4=(u-1)*n4.grad[0]+(v-1)*n4.grad[1];
          x1=lerp_normalized(v1,v2,u);
          x2=lerp_normalized(v3,v4,u);
          interpolatedValues[y][x]=fade(lerp(-.66,.66,lerp_normalized(x1,x2,v)));
          //interpolatedValues[y][x]=lerp_normalized(x1,x2,v);

          // v1=(x-n1.x)*n1.grad[0]+(y-n1.y)*n1.grad[1];
          // v2=(x-n2.x)*n2.grad[0]+(y-n2.y)*n2.grad[1];
          // v3=(x-n3.x)*n3.grad[0]+(y-n3.y)*n3.grad[1];
          // v4=(x-n4.x)*n4.grad[0]+(y-n4.y)*n4.grad[1];
          // x1=lerp(-31.108,31.108,lerp_normalized(v1,v2,u))
          // x2=lerp(-31.108,31.108,lerp_normalized(v3,v4,u))
          // interpolatedValues[y][x]=fade(lerp_normalized(x1,x2,v));

          //fade inactivo
          // interpolatedValues[y][x]=fade(lerp(-0.666,0.666,lerp_normalized(x1,x2,v)));
          
          //fade activo
          // interpolatedValues[y][x]=lerp(-0.666,0.666,lerp_normalized(x1,x2,v));
          // if(v<0.5){
          //   if (u<0.5) {
          //     interpolatedValues[y][x]=v1;
          //   }else{
          //     interpolatedValues[y][x]=v2;
          //   }
          // }else{
          //   if (u<0.5) {
          //     interpolatedValues[y][x]=v3;
          //   }else{
          //     interpolatedValues[y][x]=v4;
          //   }
          // }
          // interpolatedValues[y][x]=lerp_normalized(x1,x2,v);
          if(x==335 && y==245){
            console.log('x:'+x+'y:'+y);
            console.log([x,y,u,v,v1]);
          }
          if(x1>maxx1){
            maxx1=x1;
          }else if(x1<minx1){
            minx1=x1;
          }
          if(x2>maxx2){
            maxx2=x2;
          }else if(x2<minx2){
            minx2=x2;
          }
          if(interpolatedValues[y][x]>maxv){
            maxv=interpolatedValues[y][x];
          }else if(interpolatedValues[y][x]<minv){
            minv=interpolatedValues[y][x];
          }
          if(v1>maxv1){
            maxv1=v1;
          }else if(v1<minv1){
            minv1=v1;
          }
          if(v2>maxv2){
            maxv2=v2;
          }else if(v2<minv2){
            minv2=v2;
          }
          if(v3>maxv3){
            maxv3=v3;
          }else if(v3<minv3){
            minv3=v3;
          }
          if(v4>maxv4){
            maxv4=v4;
          }else if(v4<minv4){
            minv4=v4;
          }
          if(u>max_u){
            max_u=u;
          }else if(u<min_u){
            min_u=u;
          }
          if(v>max_v){
            max_v=v;
          }else if(v<min_v){
            min_v=v;
          }
        }
        // console.log(n4.grad[0]);
        // console.log([x,y,nx,ny,n1,n2,n3,n4])

        // dotProducts[0][y][x]=(x-n1.x)*n1.grad[0]+(y-n1.y)*n1.grad[1];
        // dotProducts[1][y][x]=(n2.x-x)*n2.grad[0]+(y-n2.y)*n2.grad[1];
        // dotProducts[2][y][x]=(x-n3.x)*n3.grad[0]+(n3.y-y)*n3.grad[1];
        // dotProducts[3][y][x]=(n4.x-x)*n4.grad[0]+(n4.y-y)*n4.grad[1];
        // console.log([dotProducts[0][y][x],dotProducts[1][y][x],dotProducts[2][y][x],dotProducts[3][y][x]]);

        // v1=(x-n1.x)*n1.grad[0]+(y-n1.y)*n1.grad[1];
        // v2=(n2.x-x)*n2.grad[0]+(y-n2.y)*n2.grad[1];
        // v3=(x-n3.x)*n3.grad[0]+(n3.y-y)*n3.grad[1];
        // v4=(n4.x-x)*n4.grad[0]+(n4.y-y)*n4.grad[1];
        
        // v1=u*n1.grad[0]+v*n1.grad[1];
        // v2=(1-u)*n2.grad[0]+v*n2.grad[1];
        // v3=u*n3.grad[0]+(1-v)*n3.grad[1];
        // v4=(1-u)*n4.grad[0]+(1-v)*n4.grad[1];

        // // u=(x-n1.x)/(n2.x-n1.x);
        // // v=(y-n1.y)/(n3.y-n1.y);

        // x1=lerp(v1,v2,u)
        // x2=lerp(v3,v4,u)
        // interpolatedValues[y][x]=lerp(x1,x2,v);
        // console.log([u,v,x1,x2,interpolatedValues[y][x]]);
      // }
      r = Math.floor(interpolatedValues[y][x]*255);
      g=r;b=r;
      // g = Math.floor(interpolatedValues[y][x]*255);
      // b = Math.floor(interpolatedValues[y][x]*255);

      pintar(x,y,r,g,b);
    }
  }
  yo+=paso;
  if(yo<ch){
    requestAnimationFrame(animate);
  }else{
    // drawGradients();
    console.log(['rango v1',minv1,maxv1]);
    console.log(['rango v2',minv2,maxv2]);
    console.log(['rango v3',minv3,maxv3]);
    console.log(['rango v4',minv4,maxv4]);
    console.log(['rango u',min_u,max_u]);
    console.log(['rango v',min_v,max_v]);
    console.log(['rango x1',minx1,maxx1]);
    console.log(['rango x2',minx2,maxx2]);
    console.log(['rango interp',minv,maxv]);
    for (var y = 0; y <=ch; y++) {

      for (var x = 0; x <= cw; x++) {
        if(x%dnw==0){
          if(x==0){
            interpolatedValues[y][x]=interpolatedValues[y][x+1]*.7;
          }else if(x==cw){
            interpolatedValues[y][x]=interpolatedValues[y][x-1]*.7;
          }else{
            // interpolatedValues[y][x]=1;
            interpolatedValues[y][x]=(interpolatedValues[y][x-1]+interpolatedValues[y][x+1])/2;
          }
        }else if(y%dnh==0){
          if(y==0){
            interpolatedValues[y][x]=interpolatedValues[y+1][x]*.7;
          }else if(y==ch){
            interpolatedValues[y][x]=interpolatedValues[y-1][x]*.7;
          }else{
            interpolatedValues[y][x]=(interpolatedValues[y-1][x]+interpolatedValues[y+1][x])/2;
          }
        }
        if(x%dnw==0||y%dnh==0){

          r = Math.floor(interpolatedValues[y][x]*255);
          g=r;b=r;
          // g = Math.floor(interpolatedValues[y][x]*255);
          // b = Math.floor(interpolatedValues[y][x]*255);

          pintar(x,y,r,g,b);
          // pintar(x,y,255,0,0);
        }
      }
    }
  }


}

function pintar(x,y,r,g,b){
  //faster
    // id.data[0] = r;
    // id.data[1] = g;
    // id.data[2] = b;
    // ctx.putImageData(id, x, y);

    //slower
	//negro a blanco
    // ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
	//magenta a cyan
    //ctx.fillStyle = 'rgb(' + (255-r) + ',' + (g) + ',' + 255 + ')';
	//red to cyan
	//ctx.fillStyle = 'rgb(' + (255-r) + ',' + (g) + ',' + (b) + ')';
	
	//no se si sea simplex
	/*let bottom=0+127;
	let top=255-127;
	if(r>=bottom&&r<=top){
		r=lerp(bottom,top,r)*r;
	}else if(r>bottom){
	r=255;
	}else{
		r=0;
	}
	g=r;b=r;*/
	//red to cyan
	//ctx.fillStyle = 'rgb(' + (255-r) + ',' + (g) + ',' + (b) + ')';
	
	//grayscale nice, probar conbinado con el siguiente(3 colores), cambiar r con este y dejar que el otro corra
	// r=Math.abs(127-r)*2;
	// if(r>45){
	// 	r=255;
	// }else{
	// 	r=0;
	// }
	ctx.fillStyle = 'rgb(' + (r) + ',' + (r) + ',' + (r) + ')';
	
	//degradado 3 colores
	/*if(r<=127){
		ctx.fillStyle = 'rgb(' + 255 + ',' + 140*lerp(0,127,g) + ',' + (127-b) + ')';
	}else{
		ctx.fillStyle = 'rgb(' + (255-291*lerp(128,255,r)) + ',' + (140+84*lerp(128,255,g)) + ',' + (0+208*lerp(128,255,b)) + ')';
	}*/
    ctx.fillRect(x, y, 1, 1);
}
function lerp_normalized(start,stop,amt){
  return start+amt*(stop-start);
}
function lerp(start,stop,val){
  return (val-start)/(stop-start);
}
function drawGradients(){
  for (var i = 0; i < nh; i++) {
      for (var j = 0; j < nw; j++) {
        pintar(nodes[i][j]['x'],nodes[i][j]['y'],0,0,0)
        pintar(nodes[i][j]['x']+2,nodes[i][j]['y']+2,0,0,0)
        pintar(nodes[i][j]['x']-2,nodes[i][j]['y']+2,0,0,0)
        pintar(nodes[i][j]['x']+2,nodes[i][j]['y']-2,0,0,0)
        pintar(nodes[i][j]['x']-2,nodes[i][j]['y']-2,0,0,0)
        ctx.moveTo(nodes[i][j]['x'],nodes[i][j]['y']);
        ctx.lineTo(nodes[i][j]['x']+20*nodes[i][j]['grad'][0],nodes[i][j]['y']+20*nodes[i][j]['grad'][1]);
      }
    }
    ctx.stroke();
}
function fade(t){
  // return t;
  return t*t*t*(t*(t*6-15)+10);
}