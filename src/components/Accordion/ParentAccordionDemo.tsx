import { useState } from 'react';
import Accordion from './Accordion';
import InnerAccordionDemo from './InnerAccordionDemo';

const ParentAccordionDemo = () => {

    const [outerOpenItems, setOuterOpenItems] = useState<string[]>([]);
    const [innerOpenItems, setInnerOpenItems] = useState<string[]>([]);

    const toggleOuterItem = (id: string) => {
        setOuterOpenItems((prev) => {
            if (prev.includes(id)) {
                return prev.filter((itemId) => itemId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const toggleInnerItem = (id: string) => {
        setInnerOpenItems((prev) => {
            if (prev.includes(id)) {
                return prev.filter((itemId) => itemId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    return (
        <div style={{maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial'}}>
            <Accordion
                items={[
                    {
                        id: 'outer1',
                        title: 'Outer Accordion 1',
                        content: <InnerAccordionDemo
                            openItems={innerOpenItems}
                            toggleItem={toggleInnerItem}
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
                initiallyCollapsed={false}
                openItems={outerOpenItems}
                toggleItem={toggleOuterItem}
            />
        </div>
    );
};

export default ParentAccordionDemo;
