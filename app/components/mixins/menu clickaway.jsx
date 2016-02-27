componentDidUpdate = (prevProps, prevState) => {
    console.log("Component Did Mount");
    window.addEventListener('mousedown', this.outsideClick, false);
  };
  
  outsideClick =  (e) => {
    console.log("outsideClick: " + !this.state.mouseDownListener);
      if (this.state.mouseDownListener) {
          this.setState({
          mouseDownListener: true
        });
        return;
      }

      
    window.removeEventListener('mousedown', this.outsideClick, false);
      this.setState({
          open: false
      });
  };
    
  handleMouseDown = () => {
        this.setState({
          mouseDownListener: true
        });
    };
    
    
    onMouseDown={this.handleMouseDown}