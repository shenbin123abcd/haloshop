const RegionSelect = React.createClass({
    pickerDependent:null,
    isFirst:true,
    val(){
        return this.pickerDependent.value;
    },
    componentDidMount() {
         //console.log(this.refs.myPicker);
        const {  onChange} = this.props;
        var values1,values2,values3;
        var displayValues1,displayValues2,displayValues3;
        app.service.findRegion({
            region_id:0
        }).then( (res)=> {
            values1=res.map(n=>n.id) ;
            displayValues1=res.map(n=>n.name);
            // p.cols[0].replaceValues(values,displayValues);
            return values1[0]
        }).then((res)=> {
            return app.service.findRegion({
                region_id:res
            })
        }).then((res)=>{
            values2=res.map(n=>n.id) ;
            displayValues2=res.map(n=>n.name);
            // p.cols[1].replaceValues(values,displayValues);
            return values2[0]
        }).then((res)=> {
            return app.service.findRegion({
                region_id:res
            })
        }).then((res)=>{
            values3=res.map(n=>n.id) ;
            displayValues3=res.map(n=>n.name);
            // p.cols[2].replaceValues(values,displayValues);
            return true
        }).then((res)=>{
            const {  value } = this.props
            this.pickerDependent = myApp.picker({
                input: this.refs.myPicker,
                toolbarCloseText:'完成',
                rotateEffect: true,
                //value:[value['ids'][0],value['ids'][1],value['ids'][2]],

                formatValue:  (picker, values,displayValues)=> {

                     //console.log(11,picker,values,displayValues)
                    if(onChange){
                        onChange(`${values[0]} ${values[1]} ${values[2]}`);
                    }
                    if(value&&this.isFirst){
                        this.isFirst=false;
                        return `${value['names'][0]} ${value['names'][1]} ${value['names'][2]}`;

                    }else{
                        return `${displayValues[0]} ${displayValues[1]} ${displayValues[2]}`;

                    }
                },
                onOpen:(p)=>{

                    // console.log(p, values)
                    // console.log(p)
                },
                onClose:function (p) {
                    // console.log(p)

                },
                onChange:function (p, values, displayValues) {
                    // console.log(22)
                },
                toolbarTemplate:`
                    <div class="toolbar">
                      <div class="toolbar-inner">
                        <div class="left"></div>
                        <div class="right">
                          <a  class="link close-picker">{{closeText}}</a>
                        </div>
                      </div>
                    </div> `,
                cols: [
                    {
                        textAlign:'center',
                        values: [''].concat(values1),
                        displayValues: ['请选择'].concat(displayValues1),
                        width:'2.4rem',
                        onChange:  (p, country)=> {
                            if(p.cols[1].replaceValues){
                                p.cols[2].replaceValues([''],['请选择']);
                                app.service.findRegion({
                                    region_id:p.cols[0].value
                                }).then( (res)=> {
                                    let values=res.map(n=>n.id) ;
                                    let displayValues=res.map(n=>n.name);
                                    if(p.cols[1].replaceValues){
                                        p.cols[1].replaceValues([''].concat(values),['请选择'].concat(displayValues));
                                    }

                                })
                            }
                        }
                    },
                    {
                        textAlign:'center',
                        values: [''].concat(values2),
                        displayValues: ['请选择'].concat(displayValues2),
                        width:'2.4rem',
                        onChange:function (p, values, displayValues) {

                            // if(p.cols[2].replaceValues) {
                            //     setTimeout(function () {
                            //         p.cols[2].replaceValues(carVendors['Japanese']);
                            //     },1000)
                            //     p.cols[2].replaceValues(carVendors['Japanese']);
                            // }
                            if(p.cols[2].replaceValues) {
                                app.service.findRegion({
                                    region_id: p.cols[1].value
                                }).then((res)=> {
                                    let values = res.map(n=>n.id);
                                    let displayValues = res.map(n=>n.name);

                                    p.cols[2].replaceValues([''].concat(values), ['请选择'].concat(displayValues));

                                })
                            }
                        },
                    },
                    {
                        textAlign:'center',
                        values: [''].concat(values3),
                        displayValues: ['请选择'].concat(displayValues3),
                        width:'2.4rem',
                        onChange:function (p, values, displayValues) {
                            // console.log(p, values, displayValues)
                        },
                    },
                ]
            });


             //console.log(this.pickerDependent)
            if(value){
                //console.log([value['ids'][0],value['ids'][1],value['ids'][2]],[value['names'][0],value['names'][1],value['names'][2]])
                this.pickerDependent.setValue([value['ids'][0],value['ids'][1],value['ids'][2]]);
            }

            //if(!value&&this.pickerDependent){
            //    // console.log(this.pickerDependent)
            //    this.pickerDependent.setValue(['','',''],['请选择','请选择','请选择']);
            //}

        });
    },
    componentWillUnmount(){
        //if(this.pickerDependent){
        //    this.pickerDependent.destroy();
        //}else{
        //    this.pickerDependent=null;
        //}
        this.pickerDependent.destroy();

    },
    componentDidUpdate(){
        console.log(11)
        const {  value,className,placeholder } = this.props
        // console.log(this.pickerDependent)
        //if(value){
        //    console.log(value)
        //    this.pickerDependent.setValue([value[ids][0],value[ids][1],value[ids][2]],
        //        [value[names][0],value[names][1],value[names][2]]);
        //}

        if(!value&&this.pickerDependent){
            // console.log(this.pickerDependent)
            this.pickerDependent.setValue(['','',''],['请选择','请选择','请选择']);
        }
    },

    render() {
        const { className,placeholder } = this.props
        // console.log(this.props);
        return (
            <div>
                <input type="text" className={className} placeholder={placeholder}  ref="myPicker" />
            </div>
        );
    }
});



export default RegionSelect