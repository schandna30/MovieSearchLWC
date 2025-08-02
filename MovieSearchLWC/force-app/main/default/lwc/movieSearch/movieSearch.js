import { LightningElement } from 'lwc';
const DELAY=400;

export default class MovieSearch extends LightningElement {

    selectedType='';
    loading=false;
    selectedSearch='';
    selectedPage="1";
    delayTimeout;
    searchResult=[];
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

}