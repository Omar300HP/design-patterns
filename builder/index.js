class CodeBuilder {
  get tabIndent() {
    return "  ";
  }
  get spaceIndent() {
    return " ";
  }
  constructor(className) {
    this.className = className;
    this.fields = [];
    return this;
  }

  addField(name) {
    this.fields.push(name);
    return this;
  }

  toStingImpl() {
    let lines = `class ${this.className} {\n`;
    if (this.fields.length) {
      const fieldsParams = `(${this.fields.join(", ")})`;
      lines += `${this.tabIndent}constructor${fieldsParams} {\n`;
      for (const field of this.fields) {
        lines += `${this.tabIndent}${this.spaceIndent} this.${field} = ${field};\n`;
      }
      lines += `${this.tabIndent}}`;
    }
    lines += `${this.fields.length ? "\n" : ""}}`;
    return lines;
  }

  toString() {
    return this.toStingImpl();
  }
}

let cb = new CodeBuilder("Person")
  .addField("name")
  .addField("age")
  .addField("job");

eval(
  cb.toString() +
    ";" +
    "const person = new Person('omar', 28, 'front-end plumber');" +
    "console.log(person);"
);
