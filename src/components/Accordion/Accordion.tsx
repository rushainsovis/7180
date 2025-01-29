import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import ArrowDown from './../../assets/arrow_down.svg';
import ArrowUp from './../../assets/arrow_up.svg';
import Plus from './../../assets/plus.svg';
import Minus from './../../assets/minus.svg';

type AccordionItem = {
    id: string;
    title: string;
    note?: string;
    content: React.ReactNode;
};

type AccordionProps = {
    items: AccordionItem[];
    allowMultipleOpen?: boolean;
    initiallyCollapsed?: Record<string, boolean>; // Object with id as key and boolean as value
    variant?: 'default' | 'alternative';
    onToggle?: (openItems: string[]) => void;
};

const Accordion: React.FC<AccordionProps> = ({
                                                 items,
                                                 allowMultipleOpen = false,
                                                 initiallyCollapsed = {},
                                                 variant = 'default',
                                                 onToggle,
                                             }) => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    useEffect(() => {
        // Initialize openItems based on the initiallyCollapsed map
        const openItemIds = items
            .filter((item) => !initiallyCollapsed[item.id]) // Items that are not collapsed
            .map((item) => item.id);

        setOpenItems(openItemIds);
    }, [initiallyCollapsed, items]);

    const toggleItem = (id: string) => {
        setOpenItems((prev) => {
            const newOpenItems = prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : allowMultipleOpen
                    ? [...prev, id]
                    : [id];
            if (onToggle) {
                onToggle(newOpenItems);
            }
            return newOpenItems;
        });
    };

    return (
        <AccordionContainer variant={variant} className="cus-acc-ctn">
            {items.map(({ id, title, content }, index) => {
                const isOpen = openItems.includes(id);
                const isFirst = index === 0; // Determine if the current item is the first
                return (
                    <AccordionItem
                        key={id}
                        isOpen={isOpen}
                        variant={variant}
                        className="cus-acc-itm"
                    >
                        <AccordionHeader
                            className="cus-acc-hed"
                            onClick={() => toggleItem(id)}
                            aria-expanded={isOpen}
                            variant={variant}
                            isFirst={isFirst} // Pass isFirst to styled component
                            isOpen={isOpen}
                        >
                            {/* Conditional Symbol Rendering */}
                            <Symbol isOpen={isOpen} variant={variant}>
                                <img
                                    src={
                                        variant === 'default'
                                            ? isOpen
                                                ? ArrowUp
                                                : ArrowDown
                                            : isOpen
                                                ? Minus
                                                : Plus
                                    }
                                    alt={isOpen ? 'Collapse' : 'Expand'}
                                />
                            </Symbol>
                            <Title>{title}</Title>
                        </AccordionHeader>
                        {isOpen && (
                            <AccordionContent
                                isOpen={isOpen}
                                variant={variant}
                                className="cus-acc-con"
                            >
                                {content}
                            </AccordionContent>
                        )}
                    </AccordionItem>
                );
            })}
        </AccordionContainer>
    );
};

export default Accordion;

// == Styled components == //
const AccordionContainer = styled.div<{ variant: string }>`
    display: flex;
    flex-direction: column;
    ${({ variant }) =>
            variant === 'alternative' &&
            css`
                gap: 32px;
                margin: 32px 32px 56px 16px;
            `}
`;

const AccordionItem = styled.div<{
    isOpen: boolean;
    variant: string;
}>(({ variant, isOpen }) => {
    const theme = useTheme();

    return {
        overflow: 'hidden',
        ...(variant === 'alternative'
            ? {
                border: `1px solid ${theme.palette.grey[30]}`,
                borderRadius: '4px',
                backgroundColor: isOpen
                    ? theme.palette.grey[30]
                    : theme.palette.grey[100],
            }
            : {
                borderBottom: `1px solid ${theme.palette.grey[30]}`,
            }),
        ...(variant === 'alternative' && {
            borderBottom: `2px solid ${theme.palette.grey[30]}`,
        }),
    };
});

const AccordionHeader = styled.button<{
    variant: string;
    isFirst: boolean;
    isOpen: boolean;
}>(({ variant, isFirst, isOpen }) => {
    const theme = useTheme();

    return {
        all: 'unset',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '12px 16px !important',
        cursor: 'pointer',
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '15px',
        fontStyle: 'normal',
        lineHeight: '130%',
        letterSpacing: '0.15px',
        fontWeight: '600',
        color: theme.palette.grey[90],

        ...(variant === 'default' && {
            '&:hover': {
                borderColor: theme.palette.grey[30],
            },
        }),
        ...(isFirst &&
            variant === 'default' && {
                borderTop: `1px solid ${theme.palette.grey[30]}`,
                '&:hover': {
                    borderTop: `1px solid ${theme.palette.grey[30]}`,
                },
            }),
        ...(isOpen &&
            variant === 'default' && {
                borderBottom: 'none', // Remove bottom border in expanded state
            }),
        ...(variant === 'alternative' && {
            backgroundColor: theme.palette.grey[20],
        }),
        '&:focus': {
            outline: '0px',
        },
    };
});

const Symbol = styled.span<{ isOpen: boolean; variant: string }>`
    font-size: 20px;
    font-weight: bold;
    transition: transform 0.3s ease, color 0.3s ease;

    img {
        display: inline-block;
        width: ${({ variant }) => (variant === 'alternative' ? '24px' : '16px')};
        height: ${({ variant }) => (variant === 'alternative' ? '24px' : '16px')};
    }
`;

const Title = styled.span`
    flex: 1;
    text-align: left;
    padding-left: 8px;
`;

const AccordionContent = styled.div<{ isOpen: boolean }>(({ isOpen }) => {
    const theme = useTheme();

    return {
        padding: '24px 24px 56px 24px !important',
        fontSize: '14px',
        color: theme.palette.grey[80],
        gap: '24px',
        backgroundColor: theme.palette.background.paper,
        display: isOpen ? 'block' : 'none',
        animation: isOpen ? 'fadeIn 0.3s ease-in' : 'none',
        /* Override MUI-generated class inside AccordionContent */
        '.MuiBox-root': {
            padding: '0 !important',
        },
    };
});