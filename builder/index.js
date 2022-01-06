class CodeBuilder {
  get tabIndent() {
    return "  ";
  }
  get spaceIndent() {
    return " ";
  }

  get logger() {
    return {
      reset: "\x1b[0m",
      green: "\x1b[32m",
      cyan: "\x1b[36m",
      magneta: "\x1b[35m",
      colorText(text, color) {
        return `${color}${text}${this.reset}`;
      },
      char(char) {
        return `${this.magneta}${char}${this.reset}`;
      },
    };
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
    let lines = `${this.logger.colorText("class", this.logger.cyan)}`;
    lines += ` ${this.logger.colorText(this.className, this.logger.green)} `;
    lines += `${this.logger.char("{")}\n`;
    if (this.fields.length) {
      let fieldsParams = `${this.logger.char("(")}`;
      fieldsParams += `${this.fields.join(", ")}`;
      fieldsParams += `${this.logger.char(")")}`;
      lines += `${this.tabIndent}`;
      lines += `${this.logger.colorText("constructor", this.logger.cyan)} `;
      lines += `${fieldsParams} ${this.logger.char("{")}\n`;
      for (const field of this.fields) {
        lines += `${this.tabIndent}${this.spaceIndent} this.${field} = ${field};\n`;
      }
      lines += `${this.tabIndent}${this.logger.char("}")}`;
    }
    lines += `${this.fields.length ? "\n" : ""}${this.logger.char("}")}`;
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

console.log(cb.toString());
