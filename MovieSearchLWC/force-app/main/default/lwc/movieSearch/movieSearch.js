import { LightningElement,wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import MOVIECHANNEL from '@salesforce/messageChannel/movie__c';
const DELAY=400;

export default class MovieSearch extends LightningElement {

    selectedType='';
    loading=false;
    selectedSearch='';
    selectedPage="1";
    delayTimeout;
    searchResult=[];
    selectedMovie='';
     @wire(MessageContext)
    messageContext;
    get typeOptions(){
        return [
            {label:'None', value:'' },
            {label:'Movie', value:'movie' },
            {label:'Series', value:'series' },
            {label:'Episode', value:'episode' },

        ];
    }
    handleTypeChange(event){
        let {name,value}=event.target;
        this.loading=true;
        if(name==="type"){
            this.selectedType=value;
        }
        else if(name==="search"){
            this.selectedSearch=value;
        }
        else if(name=="pagenumber")
        {
            this.selectedPage=value;
        }
        //debouncing
        clearTimeout( this.delayTimeout);
       this.delayTimeout= setTimeout(()=>{this.searchMovie();},DELAY)
        

    }
    //this method will search for the entered movie

     async searchMovie(){
        const url=`https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPage}&apikey=c3875512`;
        const res= await fetch(url);
        const data=await res.json();
        console.log('Output of search',data);
        this.loading=false;
        if(data.Response ==="True"){
            this.searchResult=data.Search
        }       
    }
    get displaySearchResult(){
        return this.searchResult.length>0? true :false;
    }
    movieSelectedHandler(event){
        this.selectedMovie=event.detail;
        const payload = { movieId:this.selectedMovie };

        publish(this.messageContext, MOVIECHANNEL, payload);

    }

}