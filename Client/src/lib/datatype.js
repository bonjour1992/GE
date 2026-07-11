export class ElementContent {
  name= ""
  explication=""
}

export class Link {
  type = ""
  id = -1
  __link = true
  constructor(type = "", id= -1) {
    this.type = type
    this.id = id
  }
}