import Accordion from './Accordion';
import InnerAccordionDemo from './InnerAccordionDemo';
import {useState} from "react";

const ParentAccordionDemo = () => {

    const [innerAccordionState, setInnerAccordionState] = useState({
        inner1: false,
        inner2: false,
    });

    const handleInnerToggle = (updatedState: { inner1: boolean; inner2: boolean }) => {
        console.log(updatedState)
        setInnerAccordionState(updatedState);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial' }}>
            <Accordion
                items={[
                    {
                        id: 'outer1',
                        title: 'Outer Accordion 1',
                        content: <InnerAccordionDemo
                                    onInnerToggle={handleInnerToggle}
                                    initiallyCollapsed={innerAccordionState}
                                />,
                    },
                    {
                        id: 'outer2',
                        title: 'Outer Accordion 2',
                        content: <p>Outer Content 2</p>,
                    },
                ]}
                allowMultipleOpen={true}
                variant="alternative"
                initiallyCollapsed={{
                    outer1: false,
                    outer2: false,
                }}
            />
        </div>
    );
};

export default ParentAccordionDemo;
