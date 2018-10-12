let canvas;
let xSize = 5;
let date = new Date();
let obj = {
    year: date.getFullYear(),
    name: '',
    dateStart: '',
    dateEnd: '',
    hash: '',
    awardDate: ''
};

const render = () => {
    canvas = new Canvas('preview')
    canvas.setBg();
};

const updateObject = (key, value) => {
    obj[key] = value;
    if(key === 'name') {
        obj.hash = CryptoJS.MD5(value).toString();
    }
    update();
};

const update = () => {
    canvas.setBg().then(() => {
        canvas.updateContent(obj);
    });
};

const download_img = (el) => {
    canvas.download(obj).then((res) => {
        const link = document.createElement("a");
        link.download = 'certificate.jpg';
        link.href = res;
        link.click();
    });
};

class Canvas {
    constructor (src) {
        this.canvas = document.getElementById(src);
        this.context = this.canvas.getContext('2d');
    }

    setBg() {
        let base_image = new Image();
        const self = this;
        base_image.src = 'front-end.jpg';
        return new Promise((resolve, reject) => {
            base_image.onload = function(){
                self.canvas.width = base_image.width/xSize;
                self.canvas.height = base_image.height/xSize;
                self.context.drawImage(base_image, 0, 0, self.canvas.width,self.canvas.height);
                resolve();
            }
        });
        
    }

    download(obj) {
    //    this.canvas.style.display = 'none';
        xSize = 1;
        const newCanvas = new Canvas('download-cert');
        return newCanvas.setBg().then(() => {
            newCanvas.updateContent(obj);
            xSize = 5;
            return newCanvas.canvas.toDataURL("image/jpg");
        });
    }

    updateContent(object) {
        let x, y;
        const self = this;
        // set year
        this.context.font = `bold ${60/xSize}pt Calibri`;
        y = this.canvas.height * 0.05;
        x = this.canvas.width * 0.5;
        this.context.textAlign="center";
        this.context.fillText(object.year, x, y);

        // set hash
        this.context.font = `${40/xSize}pt Calibri`;
        y = this.canvas.height * 0.98;
        x = this.canvas.width * 0.5;
        this.context.textAlign = "center";
        this.context.fillStyle = '#7B7B7B';
        this.context.fillText(`https://lodossteam.ru/certificates/${object.hash}`, x, y);

        // set user name
        this.context.font = `${185/xSize}pt Calibri`;
        y = this.canvas.height * 0.71;
        x = this.canvas.width * 0.5;
        this.context.textAlign="center";
        this.context.fillStyle = 'black';
        this.context.fillText(object.name, x, y);

        // set date start
        this.context.font = `${55/xSize}pt Calibri`;
        y = this.canvas.height * 0.76;
        x = this.canvas.width * 0.466;
        this.context.textAlign="start";
        this.context.fillText(object.dateStart, x, y);

        // set date end
        this.context.font = `${55/xSize}pt Calibri`;
        y = this.canvas.height * 0.76;
        x = this.canvas.width * 0.628;
        this.context.textAlign="start";
        this.context.fillText(object.dateEnd, x, y);
        
        // set award Date
        this.context.font = `${55/xSize}pt Calibri`;
        y = this.canvas.height * 0.94;
        x = this.canvas.width * 0.5;
        this.context.textAlign="center";
        this.context.fillText(object.awardDate, x, y);

        return new Promise((resolve) => {
            resolve(self.context);
        });
    }
}