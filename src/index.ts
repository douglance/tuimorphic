/**
 * Tuimorphic - Terminal-aesthetic React components built on Base UI
 *
 * @packageDocumentation
 */

// Core Components
export { Button, type ButtonProps } from './components/Button';
export { Input, type InputProps } from './components/Input';
export { Card, type CardProps } from './components/Card';

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

// Utilities
export { classNames } from './utils/classNames';

// Import styles for bundling
import './styles/global.css';
