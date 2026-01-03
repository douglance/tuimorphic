import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';
import { ComponentPreview, PropsTable } from './components/ComponentPreview';

// Button examples
import {
  ButtonBasic,
  ButtonVariants,
  ButtonStates,
  ButtonSecondaryStates,
  ButtonWithIcons,
  ButtonSizes,
  ButtonInteractive,
  ButtonFullWidth,
  ButtonAsLink,
  ButtonGroup,
  ButtonLoading,
} from './components/examples/ButtonExamples';

// ActionButton examples
import {
  ActionButtonBasic,
  ActionButtonVariants,
  ActionButtonStates,
  ActionButtonWithHotkeys,
  ActionButtonAllVariantsDisabled,
  ActionButtonInteractive,
  ActionButtonSizes,
} from './components/examples/ActionButtonExamples';

// ActionBar examples
import {
  ActionBarBasic,
  ActionBarWithDanger,
  ActionBarPositions,
  ActionBarFileManager,
  ActionBarEditor,
  ActionBarMixed,
  ActionBarFullWidth,
} from './components/examples/ActionBarExamples';

// Form examples
import {
  InputBasic,
  InputWithLabel,
  InputPassword,
  InputPlaceholder,
  InputDisabled,
  InputInteractive,
  TextAreaBasic,
  TextAreaWithLabel,
  TextAreaRows,
  TextAreaPlaceholder,
  SelectBasic,
  SelectWithLabel,
  SelectDisabled,
  SelectControlled,
  CheckboxBasic,
  CheckboxWithLabel,
  CheckboxGroup,
  CheckboxDisabled,
  CheckboxControlled,
  RadioBasic,
  RadioHorizontal,
  RadioDisabled,
  RadioControlled,
  ToggleBasic,
  ToggleWithLabel,
  ToggleDisabled,
  ToggleControlled,
  SliderBasic,
  SliderWithLabel,
  SliderShowValue,
  SliderRange,
  SliderControlled,
  ComboBoxBasic,
  ComboBoxWithLabel,
  ComboBoxWithDescriptions,
  ComboBoxStates,
  ComboBoxDefaultValue,
  ComboBoxControlled,
  ComboBoxInteractive,
  ComboBoxLongList,
  DatePickerBasic,
  DatePickerWithLabel,
  DatePickerDefaultValue,
  DatePickerMinMax,
  DatePickerControlled,
  DatePickerInteractive,
  DatePickerBooking,
} from './components/examples/FormExamples';

// Feedback examples
import {
  AlertBasic,
  AlertVariants,
  AlertWithTitle,
  AlertDismissible,
  BadgeBasic,
  BadgeVariants,
  ProgressBasic,
  ProgressWithLabel,
  ProgressAnimated,
  ProgressCustomChars,
  LoaderBar,
  LoaderBarDeterminate,
  LoaderBlock,
  LoaderBlockModes,
  TooltipBasic,
  TooltipPositions,
  TooltipDelay,
  MessageBasic,
  MessageConversation,
} from './components/examples/FeedbackExamples';

// Overlay examples
import {
  DialogBasic,
  DialogWithContent,
  DialogControlled,
  DrawerBasic,
  DrawerRight,
  DrawerBottom,
  DrawerWithContent,
  PopoverBasic,
  PopoverPositions,
  PopoverWithForm,
} from './components/examples/OverlayExamples';

// Layout examples
import {
  TabsBasic,
  TabsControlled,
  AccordionBasic,
  AccordionDefaultOpen,
  AccordionSingleMode,
  CardBasic,
  CardWithTitle,
  CardModes,
  DividerBasic,
  DividerVertical,
  DividerInCard,
  TableBasic,
  TableBordered,
  TableStriped,
  TableWithSelection,
} from './components/examples/LayoutExamples';

// Typography examples
import {
  TextBasic,
  TextVariants,
  TextSizes,
  TextElements,
  TextTransforms,
  TextTruncate,
  HeadingBasic,
  HeadingLevels,
  HeadingDecorated,
  HeadingHero,
  HeadingAlignment,
  CodeBasic,
  CodeInline,
  CodeVariants,
  CodeKeyboard,
  LabelBasic,
  LabelRequired,
  LabelOptional,
  LabelSizes,
  LabelVariants,
} from './components/examples/TypographyExamples';

// Navigation examples
import {
  BreadCrumbsBasic,
  BreadCrumbsCustomSeparator,
  BreadCrumbsWithClickHandlers,
  NavigationBasic,
  NavigationWithActions,
  NavigationNoBorder,
  NavigationClickHandlers,
  MenuBasic,
  MenuWithActions,
  MenuUserActions,
} from './components/examples/NavigationExamples';

// Avatar examples
import {
  AvatarBasic,
  AvatarWithFallback,
  AvatarSizes,
  AvatarWithImage,
  AvatarAsLink,
  AvatarGroup,
  AvatarImageFallback,
} from './components/examples/AvatarExamples';

// Data Display examples
import {
  CodeBlockBasic,
  CodeBlockWithLanguage,
  CodeBlockNoLineNumbers,
  CodeBlockCustomStartLine,
  TreeViewBasic,
  TreeViewWithSelection,
  TreeViewDeepNesting,
  GridBasic,
  GridWithSpanning,
  GridAutoFit,
  GridCustomGaps,
} from './components/examples/DataDisplayExamples';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    // Utility components
    ComponentPreview,
    PropsTable,
    // Button examples
    ButtonBasic,
    ButtonVariants,
    ButtonStates,
    ButtonSecondaryStates,
    ButtonWithIcons,
    ButtonSizes,
    ButtonInteractive,
    ButtonFullWidth,
    ButtonAsLink,
    ButtonGroup,
    ButtonLoading,
    // ActionButton examples
    ActionButtonBasic,
    ActionButtonVariants,
    ActionButtonStates,
    ActionButtonWithHotkeys,
    ActionButtonAllVariantsDisabled,
    ActionButtonInteractive,
    ActionButtonSizes,
    // ActionBar examples
    ActionBarBasic,
    ActionBarWithDanger,
    ActionBarPositions,
    ActionBarFileManager,
    ActionBarEditor,
    ActionBarMixed,
    ActionBarFullWidth,
    // Input examples
    InputBasic,
    InputWithLabel,
    InputPassword,
    InputPlaceholder,
    InputDisabled,
    InputInteractive,
    // TextArea examples
    TextAreaBasic,
    TextAreaWithLabel,
    TextAreaRows,
    TextAreaPlaceholder,
    // Select examples
    SelectBasic,
    SelectWithLabel,
    SelectDisabled,
    SelectControlled,
    // Checkbox examples
    CheckboxBasic,
    CheckboxWithLabel,
    CheckboxGroup,
    CheckboxDisabled,
    CheckboxControlled,
    // Radio examples
    RadioBasic,
    RadioHorizontal,
    RadioDisabled,
    RadioControlled,
    // Toggle examples
    ToggleBasic,
    ToggleWithLabel,
    ToggleDisabled,
    ToggleControlled,
    // Slider examples
    SliderBasic,
    SliderWithLabel,
    SliderShowValue,
    SliderRange,
    SliderControlled,
    // ComboBox examples
    ComboBoxBasic,
    ComboBoxWithLabel,
    ComboBoxWithDescriptions,
    ComboBoxStates,
    ComboBoxDefaultValue,
    ComboBoxControlled,
    ComboBoxInteractive,
    ComboBoxLongList,
    // DatePicker examples
    DatePickerBasic,
    DatePickerWithLabel,
    DatePickerDefaultValue,
    DatePickerMinMax,
    DatePickerControlled,
    DatePickerInteractive,
    DatePickerBooking,
    // Alert examples
    AlertBasic,
    AlertVariants,
    AlertWithTitle,
    AlertDismissible,
    // Badge examples
    BadgeBasic,
    BadgeVariants,
    // Progress examples
    ProgressBasic,
    ProgressWithLabel,
    ProgressAnimated,
    ProgressCustomChars,
    // Loader examples
    LoaderBar,
    LoaderBarDeterminate,
    LoaderBlock,
    LoaderBlockModes,
    // Tooltip examples
    TooltipBasic,
    TooltipPositions,
    TooltipDelay,
    // Message examples
    MessageBasic,
    MessageConversation,
    // Dialog examples
    DialogBasic,
    DialogWithContent,
    DialogControlled,
    // Drawer examples
    DrawerBasic,
    DrawerRight,
    DrawerBottom,
    DrawerWithContent,
    // Popover examples
    PopoverBasic,
    PopoverPositions,
    PopoverWithForm,
    // Tabs examples
    TabsBasic,
    TabsControlled,
    // Accordion examples
    AccordionBasic,
    AccordionDefaultOpen,
    AccordionSingleMode,
    // Card examples
    CardBasic,
    CardWithTitle,
    CardModes,
    // Divider examples
    DividerBasic,
    DividerVertical,
    DividerInCard,
    // Table examples
    TableBasic,
    TableBordered,
    TableStriped,
    TableWithSelection,
    // Text examples
    TextBasic,
    TextVariants,
    TextSizes,
    TextElements,
    TextTransforms,
    TextTruncate,
    // Heading examples
    HeadingBasic,
    HeadingLevels,
    HeadingDecorated,
    HeadingHero,
    HeadingAlignment,
    // Code examples
    CodeBasic,
    CodeInline,
    CodeVariants,
    CodeKeyboard,
    // Label examples
    LabelBasic,
    LabelRequired,
    LabelOptional,
    LabelSizes,
    LabelVariants,
    // BreadCrumbs examples
    BreadCrumbsBasic,
    BreadCrumbsCustomSeparator,
    BreadCrumbsWithClickHandlers,
    // Navigation examples
    NavigationBasic,
    NavigationWithActions,
    NavigationNoBorder,
    NavigationClickHandlers,
    // Menu examples
    MenuBasic,
    MenuWithActions,
    MenuUserActions,
    // Avatar examples
    AvatarBasic,
    AvatarWithFallback,
    AvatarSizes,
    AvatarWithImage,
    AvatarAsLink,
    AvatarGroup,
    AvatarImageFallback,
    // CodeBlock examples
    CodeBlockBasic,
    CodeBlockWithLanguage,
    CodeBlockNoLineNumbers,
    CodeBlockCustomStartLine,
    // TreeView examples
    TreeViewBasic,
    TreeViewWithSelection,
    TreeViewDeepNesting,
    // Grid examples
    GridBasic,
    GridWithSpanning,
    GridAutoFit,
    GridCustomGaps,
  };
}
