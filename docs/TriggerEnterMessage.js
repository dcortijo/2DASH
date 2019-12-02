import Message from './Message.js';
export default class TriggerEnterMessage extends Message{
    constructor(receiver, body, other){
        super(receiver);
        this.body = body;
        this.other = other;
    }
}