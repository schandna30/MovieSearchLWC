import { LightningElement,wire } from 'lwc';
// Import message service features required for subscribing and the message channel
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import MOVIECHANNEL from '@salesforce/messageChannel/movie__c';

export default class MovieDetail extends LightningElement {
    
    laodingComp=false;
    movieDetails=[];
    @wire(MessageContext)
    messageContext;
    subscription = null;
     connectedCallback() {
        this.subscribeToMessageChannel();
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
     subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                MOVIECHANNEL,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }
    handleMessage(message){
       let movieId  = message.movieId;
       console.log(this.movieId);
       this.fetchMovieDetail(movieId);
    }
     
    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    async fetchMovieDetail(movieId){
        let url=`https://www.omdbapi.com/?i=${movieId}&plot=full&&apikey=c3875512`;
        const res= await fetch(url);
        const data = await res.json();
       
        console.log('data',data);
        this.laodingComp=true;
        this.movieDetails=data;

     }


    }