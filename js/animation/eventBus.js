class EventBus{

    static eventos = {};

    static on(evento, callback){

        if(!this.eventos[evento]){

            this.eventos[evento] = [];
        }

        this.eventos[evento].push(callback);

    }

    static emit(evento, datos = null){

        if(!this.eventos[evento])
            return;

        for(const callback of this.eventos[evento]){

            callback(datos);
        }

    }

    static off(evento, callback){

        if(!this.eventos[evento])
            return;

        this.eventos[evento] =
        this.eventos[evento]
        .filter(
            fn=>fn!==callback
        );

    }

}