export function PageSplitterCheck( items, itemsPerPage, checkItemsOnPage, checkItemBelongsTo ) {
    let splitter = new PageSplitter(items, itemsPerPage);
    let solution = [];
    solution[0] = splitter.pageCount();
    solution[1] = splitter.itemCount();
    solution[2] = splitter.pageItemCount(checkItemsOnPage);
    solution[3] = splitter.pageIndex(checkItemBelongsTo);
    return solution;
  }
  // DO NOT MODIFY THE CODE ABOVE!
// Constructor de array
    function PageSplitter(collection, itemsPerPage){
        this.collection = collection;
        this.itemsPerPage = itemsPerPage;
    }
    
    // da como respuesta la cantidad de en la colección
    PageSplitter.prototype.itemCount = function() {
        return this.collection.length;
    }
    
    // da como respuesta las paginas
    PageSplitter.prototype.pageCount = function() {
        return Math.ceil(this.collection.length / this.itemsPerPage);
    }
    
    // numero de items en la page
    PageSplitter.prototype.pageItemCount = function(pageIndex) {
        if (pageIndex > this.pageCount() - 1 || pageIndex < 0) {
        return -1;
        }
        
        return this.itemsPerPage - Math.ceil((((pageIndex + 1)*this.itemsPerPage)%this.itemCount())%this.itemsPerPage);
    }
    

    // determinación de pagina
    PageSplitter.prototype.pageIndex = function(itemIndex) {
        if (itemIndex > this.itemCount() - 1 || itemIndex < 0) {
        return -1;
        }
        
        return Math.ceil((itemIndex + 1)/this.itemsPerPage) - 1;
    }
    