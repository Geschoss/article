function prototype(obj) {
    // function Template() {}
    let Template = {}
    Template.__proto__ = obj;
    
    return Template
}

const breathing = {
  breath() {
    console.log(`breath with ${this.health}`);
  },
};

const animal = prototype(breathing);
const cat = prototype(breathing);

animal.health = 30;
animal.breath()

cat.health = 40;
cat.breath()