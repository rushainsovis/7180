import Accordion from './Accordion';

type InnerAccordionDemoProps = {
    openItems: string[];
    toggleItem: (id: string) => void;
};

const InnerAccordionDemo: React.FC<InnerAccordionDemoProps> = ({ openItems, toggleItem }) => {


    return (<Accordion
            items={[
                {id: 'inner1', title: 'Inner Accordion 1', content: <p>Inner Content 1</p>},
                {id: 'inner2', title: 'Inner Accordion 2', content: <p>Inner Content 2</p>},
            ]}
            allowMultipleOpen={true}
            variant="default"
            initiallyCollapsed={false}
            openItems={openItems}
            toggleItem={toggleItem}
        />
    );
};

export default InnerAccordionDemo;
