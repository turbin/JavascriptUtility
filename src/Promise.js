/**
 * Created by turbineyan on 9/12/16.
 */


function Promise(){

}

Promise.prototype = {
    callback:null, caller:null,onDone:null,

    when:function(){
        if(this.callbacks){
            this.callbacks = null;
        }

        this.callbacks = [];

        this.caller = null;
        for(var i=0; i!=arguments.length; i++){
            this.callbacks.push({fn:arguments[i], onSuccess:this.onSuccess, onFail:this.fail});
        }
        ///this.callbacks[this.idx].fn.call(this, this);
        return this;
    },
    resolve:function(){
        this.next();
        return this;
    },
    reject:function(){
        this.caller.onFail(this);
        return this;
    },
    done:function(callback){
        this.onDone = callback;
        return this;
    },
    onSuccess:function(promise){
        console.log('on success!');
    },
    next:function(){
        this.caller = null;
        if(this.callbacks.length !== 0){
            this.caller= this.callbacks.shift(1);
            this.caller.fn(this);
            return this;
        }

        if(this.onDone)this.onDone(this);
        return this;
    },
    fail:function(promise) {
        var fn =this.caller.fn;
        this.caller = null;
        throw new EvalError('promise call ' + fn + ' call fail!');
    }
};
