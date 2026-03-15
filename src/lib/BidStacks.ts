interface bidType{
    bidderId: string;
    amount: number;
    bidTime: Date;
}

class Node{
    value: bidType;
    next: Node | null;
    constructor(value: bidType){
        this.value = value;
        this.next = null;
    }
}


export class BidStack{
    top: Node | null;
    length: number;
    constructor(value: bidType){
    const newNode = new Node(value)
    this.top = newNode
    this.length = 1
  }

    push(value: bidType){
    const newNode = new Node(value)
    if(this.length === 0){
        this.top = newNode
    }

    newNode.next = this.top
    this.top = newNode
    this.length++
    return this
    }


    topValue(): bidType | null {
    if(this.top === null) return null
    return this.top.value
    }

    clear(){
        this.top = null
        this.length = 0
    }
}