import React, {PropsWithChildren, useRef, Ref, useEffect} from 'react';
import * as bootstrap from 'bootstrap';

interface IProps extends PropsWithChildren {
    title: string,
    options?: Partial<bootstrap.Tooltip.Options>
}

const defaultProps: IProps = {
    title: '',
    options: {
        placement: 'top',
    }
}


export default function Tooltip(props: IProps) {
    const ref: Ref<HTMLSpanElement> = useRef();
    let tooltip: bootstrap.Tooltip;

    props = {...defaultProps, ...props};
    props.options.title =  props.title;

    useEffect(() => {

       tooltip = new bootstrap.Tooltip(ref.current, props.options);

       return(() => {

           tooltip.dispose();

       });

    }, [props]);

   return(
       <span ref={ref}>
           {props.children}
       </span>
   )

}
