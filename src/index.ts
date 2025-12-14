/**
 * Tuimorphic - Terminal-aesthetic React components built on Base UI
 *
 * @packageDocumentation
 */

// Core Components
export { Button, type ButtonProps } from './components/Button';
export { Input, type InputProps } from './components/Input';
export { Card, type CardProps } from './components/Card';
export { ActionButton, type ActionButtonProps } from './components/ActionButton';
export { ActionBar, type ActionBarProps } from './components/ActionBar';

// Form Controls
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { RadioGroup, Radio, type RadioGroupProps, type RadioProps } from './components/Radio';
export { Toggle, type ToggleProps } from './components/Toggle';
export { Select, type SelectProps, type SelectOption } from './components/Select';
export { TextArea, type TextAreaProps } from './components/TextArea';

// Feedback
export { Alert, type AlertProps } from './components/Alert';
export { Badge, type BadgeProps } from './components/Badge';
export { Progress, type ProgressProps } from './components/Progress';
export { Tooltip, type TooltipProps } from './components/Tooltip';

// Overlays
export {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
  type DialogProps,
} from './components/Dialog';

export {
  Menu,
  MenuItem,
  MenuSeparator,
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  type MenuProps,
  type MenuItemProps,
  type MenuSeparatorProps,
} from './components/Menu';

export {
  Popover,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverBackdrop,
  PopoverPositioner,
  PopoverPopup,
  PopoverArrow,
  type PopoverProps,
  type PopoverTitleProps,
  type PopoverDescriptionProps,
  type PopoverCloseProps,
} from './components/Popover';

export {
  Drawer,
  DrawerRoot,
  DrawerTrigger,
  DrawerPortal,
  DrawerBackdrop,
  DrawerPanel,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerContent,
  type DrawerProps,
} from './components/Drawer';

// Layout
export { Divider, type DividerProps } from './components/Divider';
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from './components/Tabs';
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionRoot,
  AccordionHeader,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
} from './components/Accordion';

// Data Display
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableProps,
  type TableHeaderProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableRowProps,
  type TableHeadProps,
  type TableCellProps,
  type TableCaptionProps,
} from './components/Table';

export { CodeBlock, type CodeBlockProps } from './components/CodeBlock';
export { TreeView, type TreeViewProps, type TreeNode } from './components/TreeView';
export { Grid, GridItem, type GridProps, type GridItemProps } from './components/Grid';
export { CardDouble, CardDoubleInner, type CardDoubleProps, type CardDoubleInnerProps } from './components/CardDouble';

// Navigation
export { BreadCrumbs, type BreadCrumbsProps, type BreadCrumbItem } from './components/BreadCrumbs';
export { Navigation, type NavigationProps, type NavItem } from './components/Navigation';

// Media
export { Avatar, type AvatarProps } from './components/Avatar';

// Typography
export { Text, type TextProps } from './components/Text';
export { Heading, type HeadingProps } from './components/Heading';
export { Code, type CodeProps } from './components/Code';
export { Label, type LabelProps } from './components/Label';

// Form Controls (additional)
export { ComboBox, type ComboBoxProps, type ComboBoxOption } from './components/ComboBox';
export { DatePicker, type DatePickerProps } from './components/DatePicker';
export { Slider, type SliderProps } from './components/Slider';

// Feedback (additional)
export { BarLoader, BlockLoader, type BarLoaderProps, type BlockLoaderProps } from './components/Loader';
export { Message, MessageList, type MessageProps, type MessageListProps } from './components/Message';

// Layout (additional)
export { SidebarLayout, type SidebarLayoutProps } from './components/SidebarLayout';

// Utilities
export { classNames } from './utils/classNames';

// Import styles for bundling
import './styles/global.css';
