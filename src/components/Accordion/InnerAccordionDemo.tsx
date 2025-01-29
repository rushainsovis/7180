import Accordion from './Accordion';
import {useEffect, useState} from "react";

const InnerAccordionDemo = ({initiallyCollapsed, onInnerToggle}) => {

    const [localState, setLocalState] = useState(initiallyCollapsed);

    useEffect(() => {
        onInnerToggle(localState);
    }, [localState, onInnerToggle]);


    const handleToggle = (openItems: string[]) => {
        const updatedState = {
            inner1: openItems.includes('inner1'),
            inner2: openItems.includes('inner2'),
        };

        console.log(updatedState);
        setLocalState(updatedState);
    }

    return (
        <Accordion
            items={[
                {id: 'inner1', title: 'Inner Accordion 1', content: <p>Inner Content 1</p>},
                {id: 'inner2', title: 'Inner Accordion 2', content: <p>Inner Content 2</p>},
            ]}
            allowMultipleOpen={true}
            variant="default"
            initiallyCollapsed={initiallyCollapsed}
            onToggle={handleToggle}
        />
    );
};

export default InnerAccordionDemo;
