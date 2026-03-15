import { c as createLucideIcon, r as reactExports, aH as createRovingFocusGroupScope, u as useDirection, b as useControllableState, j as jsxRuntimeExports, d as createContextScope, aI as Root, P as Primitive, g as useComposedRefs, aJ as Item, h as composeEventHandlers, aw as Presence, aK as useSize, t as cn, ao as useGetCallerWallet, al as useGetCallerUserProfile, G as Card, H as CardHeader, I as CardTitle, aq as Wallet, J as CardContent, K as formatCurrency, U as Button, Q as CardDescription, aL as getTransactionTypeLabel, $ as formatDateTime, aM as useDeposit, aN as Smartphone, a8 as ue, aO as useWithdraw, aP as useQueryClient, a6 as Gift, a2 as TriangleAlert } from "./index-VIWjWtVa.js";
import { B as Badge } from "./badge-BR_kH1hm.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription } from "./dialog-DfyzdZfO.js";
import { L as Label, I as Input } from "./label-DJT1Ci_D.js";
import { u as usePrevious } from "./index-Bj-lkyA5.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DXc6zw39.js";
import { Z as Zap } from "./zap-D_hb_VH8.js";
import { C as CircleCheck } from "./circle-check-CC3Gy9Et.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
];
const Ticket = createLucideIcon("ticket", __iconNode);
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadio,
      name,
      checked = false,
      required,
      disabled,
      value = "on",
      onCheck,
      form,
      ...radioProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioProvider, { scope: __scopeRadio, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": checked,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...radioProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            if (!checked) onCheck == null ? void 0 : onCheck();
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadio, forceMount, ...indicatorProps } = props;
    const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...indicatorProps,
        ref: forwardedRef
      }
    ) });
  }
);
RadioIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var RadioBubbleInput = reactExports.forwardRef(
  ({
    __scopeRadio,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.input,
      {
        type: "radio",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
RadioBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext] = createContextScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? null,
      onChange: onValueChange,
      caller: RADIO_GROUP_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroupProvider,
      {
        scope: __scopeRadioGroup,
        name,
        required,
        disabled,
        value,
        onValueChange: setValue,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            orientation,
            dir: direction,
            loop,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "radiogroup",
                "aria-required": required,
                "aria-orientation": orientation,
                "data-disabled": disabled ? "" : void 0,
                dir: direction,
                ...groupProps,
                ref: forwardedRef
              }
            )
          }
        )
      }
    );
  }
);
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, disabled, ...itemProps } = props;
    const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const radioScope = useRadioScope(__scopeRadioGroup);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const checked = context.value === itemProps.value;
    const isArrowKeyPressedRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };
      const handleKeyUp = () => isArrowKeyPressedRef.current = false;
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !isDisabled,
        active: checked,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Radio,
          {
            disabled: isDisabled,
            required: context.required,
            checked,
            ...radioScope,
            ...itemProps,
            name: context.name,
            ref: composedRefs,
            onCheck: () => context.onValueChange(itemProps.value),
            onKeyDown: composeEventHandlers((event) => {
              if (event.key === "Enter") event.preventDefault();
            }),
            onFocus: composeEventHandlers(itemProps.onFocus, () => {
              var _a;
              if (isArrowKeyPressedRef.current) (_a = ref.current) == null ? void 0 : _a.click();
            })
          }
        )
      }
    );
  }
);
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, ...indicatorProps } = props;
    const radioScope = useRadioScope(__scopeRadioGroup);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioIndicator, { ...radioScope, ...indicatorProps, ref: forwardedRef });
  }
);
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "radio-group",
      className: cn("grid gap-3", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
const REDEEM_REQUESTS_KEY = "gp_redeem_requests";
function getRedeemRequests() {
  try {
    return JSON.parse(localStorage.getItem(REDEEM_REQUESTS_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveRedeemRequests(requests) {
  localStorage.setItem(REDEEM_REQUESTS_KEY, JSON.stringify(requests));
}
const WITHDRAWAL_DETAILS_KEY = "withdrawal_details_v2";
const WITHDRAWAL_DAILY_KEY = "withdrawal_daily_v2";
const MY_VOUCHERS_KEY = "my_play_vouchers_v1";
function getMyVouchers(userId) {
  try {
    const all = JSON.parse(
      localStorage.getItem(MY_VOUCHERS_KEY) || "[]"
    );
    if (!userId) return all;
    return all.filter((v) => v.userId === userId);
  } catch {
    return [];
  }
}
function saveMyVouchers(vouchers) {
  localStorage.setItem(MY_VOUCHERS_KEY, JSON.stringify(vouchers));
}
function generateVoucherCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segment = () => Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `${segment()}-${segment()}-${segment()}-${segment()}`;
}
function getWithdrawalDetails() {
  try {
    return JSON.parse(localStorage.getItem(WITHDRAWAL_DETAILS_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveWithdrawalDetails(details) {
  localStorage.setItem(WITHDRAWAL_DETAILS_KEY, JSON.stringify(details));
}
function getWithdrawalsToday(userId) {
  try {
    const raw = JSON.parse(localStorage.getItem(WITHDRAWAL_DAILY_KEY) || "{}");
    const todayKey = `${userId}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`;
    return raw[todayKey] ?? 0;
  } catch {
    return 0;
  }
}
function incrementWithdrawalsToday(userId) {
  try {
    const raw = JSON.parse(localStorage.getItem(WITHDRAWAL_DAILY_KEY) || "{}");
    const todayKey = `${userId}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`;
    raw[todayKey] = (raw[todayKey] ?? 0) + 1;
    localStorage.setItem(WITHDRAWAL_DAILY_KEY, JSON.stringify(raw));
  } catch {
  }
}
function getUpiUsageCount(userId, upiId) {
  const details = getWithdrawalDetails();
  return details.filter(
    (d) => {
      var _a;
      return d.userId === userId && d.method === "upi" && ((_a = d.upiId) == null ? void 0 : _a.toLowerCase()) === upiId.toLowerCase();
    }
  ).length;
}
function WalletPage() {
  const { data: wallet } = useGetCallerWallet();
  const { data: profile } = useGetCallerUserProfile();
  const [depositDialogOpen, setDepositDialogOpen] = reactExports.useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = reactExports.useState(false);
  const transactions = (wallet == null ? void 0 : wallet.transactions) || [];
  const sortedTransactions = [...transactions].sort(
    (a, b) => Number(b.timestamp - a.timestamp)
  );
  const copyReferralCode = () => {
    if (profile == null ? void 0 : profile.referralCode) {
      navigator.clipboard.writeText(profile.referralCode);
      ue.success("Referral code copied to clipboard!");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-12 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold font-display mb-2", children: "My Wallet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage your funds and view transaction history" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5" }),
        "Available Balance"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl font-bold font-display", children: wallet ? formatCurrency(wallet.balance) : "₹0.00" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Dialog,
            {
              open: depositDialogOpen,
              onOpenChange: setDepositDialogOpen,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "flex-1 bg-primary hover:bg-primary/90", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
                  "Add Money"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DepositDialog, { onClose: () => setDepositDialogOpen(false) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Dialog,
            {
              open: withdrawDialogOpen,
              onOpenChange: setWithdrawDialogOpen,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "flex-1 border-primary/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "mr-2 h-4 w-4" }),
                  "Withdraw"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  WithdrawDialog,
                  {
                    balance: (wallet == null ? void 0 : wallet.balance) || BigInt(0),
                    onClose: () => setWithdrawDialogOpen(false),
                    userId: (profile == null ? void 0 : profile.username) ?? void 0
                  }
                )
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PendingWithdrawalsCard, { userId: (profile == null ? void 0 : profile.username) ?? "" }),
    (profile == null ? void 0 : profile.referralCode) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-secondary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Referral Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Share your code and earn bonuses when friends register" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 bg-muted px-4 py-3 rounded-md font-mono text-lg font-bold", children: profile.referralCode }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: copyReferralCode, variant: "outline", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Transaction History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View all your wallet transactions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: sortedTransactions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Amount" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: sortedTransactions.map((txn) => {
          const isCredit = txn.transactionType === "deposit" || txn.transactionType === "prize" || txn.transactionType === "bonus";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: isCredit ? "default" : "secondary",
                className: isCredit ? "bg-success" : "",
                children: getTransactionTypeLabel(txn.transactionType)
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs truncate", children: txn.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: formatDateTime(txn.timestamp) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: isCredit ? "text-success" : "text-destructive",
                children: [
                  isCredit ? "+" : "-",
                  formatCurrency(txn.amount)
                ]
              }
            ) })
          ] }, txn.id.toString());
        }) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No transactions yet" })
      ] }) })
    ] })
  ] });
}
function PendingWithdrawalsCard({ userId }) {
  const details = getWithdrawalDetails();
  const userDetails = details.filter((d) => d.userId === userId || !userId).sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
  const methodLabel = {
    upi: "UPI",
    voucher: "Play Voucher"
  };
  const methodColor = {
    upi: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    voucher: "bg-green-500/20 text-green-300 border-green-500/30"
  };
  if (userDetails.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "border-primary/20",
      "data-ocid": "wallet.pending_withdrawals.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-yellow-400" }),
            "My Withdrawal Requests"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Track your recent withdrawal requests and their status" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: userDetails.map((d, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border/50",
            "data-ocid": `wallet.pending_withdrawals.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-medium px-2 py-0.5 rounded border ${methodColor[d.method]}`,
                      children: methodLabel[d.method]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm", children: [
                    "₹",
                    d.amount.toFixed(2)
                  ] }),
                  d.method === "upi" && d.upiId && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground truncate max-w-[150px]", children: d.upiId }),
                  d.method === "voucher" && d.voucherCode && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-green-400 tracking-wider", children: d.voucherCode })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: new Date(d.timestamp).toLocaleString("en-IN") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: d.status === "approved" ? "default" : d.status === "rejected" ? "destructive" : "secondary",
                  className: d.status === "approved" ? "bg-success" : "",
                  children: d.status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                    "Pending"
                  ] }) : d.status === "approved" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                    "Approved"
                  ] }) : "Rejected"
                }
              )
            ]
          },
          d.requestId
        )) }) })
      ]
    }
  );
}
function DepositDialog({ onClose }) {
  const [activeTab, setActiveTab] = reactExports.useState("upi");
  const [erupiAmount, setErupiAmount] = reactExports.useState(null);
  const [erupiCustomAmount, setErupiCustomAmount] = reactExports.useState("");
  const [erupiQrGenerated, setErupiQrGenerated] = reactExports.useState(false);
  const [amount, setAmount] = reactExports.useState("");
  const [upiId, setUpiId] = reactExports.useState("");
  const [qrGenerated, setQrGenerated] = reactExports.useState(false);
  const depositMutation = useDeposit();
  const qrAmountValue = Number.parseFloat(amount);
  const upiPaymentString = !Number.isNaN(qrAmountValue) && qrAmountValue > 0 ? `upi://pay?pa=khalnayak@okaxis&am=${qrAmountValue}&cu=INR&tn=KhalnayakDeposit` : "";
  const qrImageUrl = upiPaymentString ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiPaymentString)}&color=00FF88&bgcolor=0A0A0A` : "";
  const handleUpiSubmit = async (e) => {
    e.preventDefault();
    const amountValue = Number.parseFloat(amount);
    if (Number.isNaN(amountValue) || amountValue <= 0) {
      ue.error("Please enter a valid amount");
      return;
    }
    if (!upiId.trim()) {
      ue.error("Please enter your UPI ID");
      return;
    }
    try {
      const amountInPaise = BigInt(Math.round(amountValue * 100));
      await depositMutation.mutateAsync(amountInPaise);
      ue.success(
        `Deposit request of ₹${amountValue} submitted. Admin will verify and credit.`
      );
      setAmount("");
      setUpiId("");
      onClose();
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to submit deposit request");
    }
  };
  const handleQrPaymentDone = async () => {
    const amountValue = Number.parseFloat(amount);
    if (Number.isNaN(amountValue) || amountValue <= 0) {
      ue.error("Please enter a valid amount first");
      return;
    }
    try {
      const amountInPaise = BigInt(Math.round(amountValue * 100));
      await depositMutation.mutateAsync(amountInPaise);
      ue.success(
        `Payment confirmation submitted for ₹${amountValue}. Admin will verify and credit.`
      );
      setAmount("");
      setQrGenerated(false);
      onClose();
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to submit payment confirmation");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogTitle,
        {
          className: "flex items-center gap-2",
          style: { fontFamily: "Orbitron, sans-serif", color: "#00FF88" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }),
            "ADD MONEY"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Deposit via UPI ID or scan QR code" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-xl overflow-hidden border border-[#00FF88]/20 bg-[#16213E]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("upi"),
          className: `flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === "upi" ? "bg-[#00FF88]/20 text-[#00FF88] border-b-2 border-[#00FF88]" : "text-gray-400 hover:text-white"}`,
          "data-ocid": "wallet.deposit.upi.tab",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-4 w-4" }),
            "💳 UPI"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("qr"),
          className: `flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === "qr" ? "bg-[#9d4edd]/20 text-[#9d4edd] border-b-2 border-[#9d4edd]" : "text-gray-400 hover:text-white"}`,
          "data-ocid": "wallet.deposit.qr.tab",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
            "📷 QR Code"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab("erupi"),
          className: `flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === "erupi" ? "bg-[#FF6B35]/20 text-[#FF6B35] border-b-2 border-[#FF6B35]" : "text-gray-400 hover:text-white"}`,
          "data-ocid": "wallet.deposit.erupi.tab",
          children: "🏦 e-RUPI"
        }
      )
    ] }),
    activeTab === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleUpiSubmit,
        className: "space-y-4",
        "data-ocid": "wallet.deposit.upi.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "depositUpiId",
                style: { fontFamily: "Rajdhani, sans-serif" },
                children: "UPI ID"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "depositUpiId",
                value: upiId,
                onChange: (e) => setUpiId(e.target.value),
                placeholder: "yourname@oksbi",
                className: "font-mono border-[#00FF88]/30 bg-[#16213E] focus:border-[#00FF88]",
                "data-ocid": "wallet.deposit.upi_id.input",
                required: true
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Supported: GPay, PhonePe, Paytm (e.g. name@okaxis, number@paytm)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "depositAmount",
                style: { fontFamily: "Rajdhani, sans-serif" },
                children: "Amount (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "depositAmount",
                type: "number",
                step: "1",
                min: "10",
                value: amount,
                onChange: (e) => setAmount(e.target.value),
                placeholder: "Enter amount (min ₹10)",
                className: "border-[#00FF88]/30 bg-[#16213E] focus:border-[#00FF88]",
                "data-ocid": "wallet.deposit.amount.input",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1", children: [100, 500, 1e3, 2e3].map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setAmount(preset.toString()),
              className: "py-1.5 text-xs font-semibold rounded-lg border border-[#00FF88]/30 text-[#00FF88] bg-[#00FF88]/5 hover:bg-[#00FF88]/15 transition-colors",
              children: [
                "₹",
                preset
              ]
            },
            preset
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-blue-950/30 border border-blue-500/20 text-xs text-blue-300 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "📌 How it works:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "1. Enter UPI ID & amount → Submit request" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "2. Pay ₹",
              amount || "X",
              " to",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "khalnayak@okaxis" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "3. Admin verifies & credits your wallet" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full font-bold",
              style: {
                background: "linear-gradient(135deg, #00FF88, #00cc6a)",
                color: "#0A0A0A",
                fontFamily: "Orbitron, sans-serif"
              },
              disabled: depositMutation.isPending,
              "data-ocid": "wallet.deposit.upi.submit_button",
              children: depositMutation.isPending ? "Submitting..." : "⚡ SUBMIT UPI REQUEST"
            }
          )
        ]
      }
    ),
    activeTab === "qr" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "wallet.deposit.qr.panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "qrAmount",
            style: { fontFamily: "Rajdhani, sans-serif" },
            children: "Amount (₹)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "qrAmount",
            type: "number",
            step: "1",
            min: "10",
            value: amount,
            onChange: (e) => {
              setAmount(e.target.value);
              setQrGenerated(false);
            },
            placeholder: "Enter amount (min ₹10)",
            className: "border-[#9d4edd]/30 bg-[#16213E] focus:border-[#9d4edd]",
            "data-ocid": "wallet.deposit.qr_amount.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1", children: [100, 500, 1e3, 2e3].map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setAmount(preset.toString());
            setQrGenerated(false);
          },
          className: "py-1.5 text-xs font-semibold rounded-lg border border-[#9d4edd]/30 text-[#9d4edd] bg-[#9d4edd]/5 hover:bg-[#9d4edd]/15 transition-colors",
          children: [
            "₹",
            preset
          ]
        },
        preset
      )) }),
      !qrGenerated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            const v = Number.parseFloat(amount);
            if (Number.isNaN(v) || v < 10) {
              ue.error("Please enter a valid amount (min ₹10)");
              return;
            }
            setQrGenerated(true);
          },
          className: "w-full py-3 font-bold rounded-xl border-2 border-[#9d4edd] text-[#9d4edd] bg-[#9d4edd]/10 hover:bg-[#9d4edd]/20 transition-all",
          style: { fontFamily: "Orbitron, sans-serif", fontSize: "13px" },
          "data-ocid": "wallet.deposit.generate_qr.button",
          children: "📷 GENERATE QR CODE"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3 p-4 rounded-xl border border-[#9d4edd]/40 bg-[#16213E]",
            "data-ocid": "wallet.deposit.qr.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#9d4edd] font-semibold uppercase tracking-wider", children: [
                "Scan to Pay ₹",
                amount
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-xl overflow-hidden border-2 border-[#00FF88]/40 p-2 bg-white",
                  style: { boxShadow: "0 0 20px rgba(0,255,136,0.2)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: qrImageUrl,
                      alt: `QR Code for ₹${amount} UPI payment`,
                      width: 200,
                      height: 200,
                      className: "block"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-white", children: [
                  "Pay to:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#00FF88] font-mono", children: "khalnayak@okaxis" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400", children: [
                  "Amount: ₹",
                  amount,
                  " · UPI"
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-purple-950/30 border border-purple-500/20 text-xs text-purple-300 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "📌 Steps to complete payment:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "1. Open GPay / PhonePe / Paytm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "2. Scan the QR code above" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "3. Pay ₹",
            amount,
            " and complete the payment"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '4. Come back & click "✅ Payment Done" below' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleQrPaymentDone,
            className: "w-full font-bold",
            style: {
              background: "linear-gradient(135deg, #00FF88, #00cc6a)",
              color: "#0A0A0A",
              fontFamily: "Orbitron, sans-serif"
            },
            disabled: depositMutation.isPending,
            "data-ocid": "wallet.deposit.payment_done.button",
            children: depositMutation.isPending ? "Confirming..." : "✅ PAYMENT DONE"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setQrGenerated(false),
            className: "w-full text-xs text-gray-400 hover:text-white py-1 transition-colors",
            "data-ocid": "wallet.deposit.qr_back.button",
            children: "← Change Amount"
          }
        )
      ] })
    ] }),
    activeTab === "erupi" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "wallet.deposit.erupi.panel", children: !erupiQrGenerated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm font-bold text-[#FF6B35]",
            style: { fontFamily: "Orbitron, sans-serif" },
            children: "🏦 e-RUPI Voucher (No Bank Needed)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-1", children: "NPCI Government Digital Voucher • One-time use • 24hr validity" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            style: { fontFamily: "Rajdhani, sans-serif" },
            className: "text-sm font-semibold",
            children: "Select Amount (₹10 – ₹500)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [10, 25, 50, 100, 200, 500].map((preset, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setErupiAmount(preset);
              setErupiCustomAmount("");
            },
            className: `py-2 text-sm font-bold rounded-lg border transition-all ${erupiAmount === preset ? "border-[#FF6B35] bg-[#FF6B35]/20 text-[#FF6B35]" : "border-[#FF6B35]/20 text-gray-300 bg-[#16213E] hover:border-[#FF6B35]/50"}`,
            "data-ocid": `wallet.deposit.erupi_amount.button.${idx + 1}`,
            children: [
              "₹",
              preset
            ]
          },
          preset
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            style: { fontFamily: "Rajdhani, sans-serif" },
            className: "text-xs text-gray-400",
            children: "Or enter custom amount"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "number",
            min: "10",
            max: "500",
            value: erupiCustomAmount,
            onChange: (e) => {
              setErupiCustomAmount(e.target.value);
              setErupiAmount(null);
            },
            placeholder: "₹10 – ₹500",
            className: "border-[#FF6B35]/30 bg-[#16213E] focus:border-[#FF6B35]",
            "data-ocid": "wallet.deposit.erupi_amount.input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            const amt = erupiAmount ?? Number.parseFloat(erupiCustomAmount);
            if (Number.isNaN(amt) || amt < 10 || amt > 500) {
              ue.error(
                "Please select or enter a valid amount (₹10–₹500)"
              );
              return;
            }
            setErupiAmount(amt);
            setErupiQrGenerated(true);
          },
          className: "w-full py-3 rounded-xl font-bold text-sm transition-all",
          style: {
            background: "linear-gradient(135deg, #FF6B35, #E84393)",
            color: "#fff",
            fontFamily: "Orbitron, sans-serif"
          },
          "data-ocid": "wallet.deposit.generate_erupi.button",
          children: "🏦 GENERATE e-RUPI QR"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "wallet.deposit.erupi.card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-center space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm font-bold text-[#FF6B35]",
            style: { fontFamily: "Orbitron, sans-serif" },
            children: "e-RUPI Voucher QR"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 text-xs text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-[#FF6B35]/20 text-[#FF6B35] px-2 py-0.5 rounded-full font-semibold", children: "⏰ Valid for 24 hours" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-semibold", children: "🔒 One-time use" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=khalnayak@upi&pn=KhalnayakEsports&am=${erupiAmount}&cu=INR&tn=eRUPI-VOUCHER-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)}&color=FF6B35&bgcolor=FFFFFF`,
            alt: `e-RUPI QR for ₹${erupiAmount}`,
            className: "w-[200px] h-[200px]"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 text-center", children: "Scan with any UPI app (GPay, PhonePe, Paytm)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-lg font-bold text-[#FF6B35]",
            style: { fontFamily: "Orbitron, sans-serif" },
            children: [
              "₹",
              erupiAmount
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-blue-950/30 border border-blue-500/20 text-xs text-blue-300 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "📌 Steps:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "1. Open any UPI app" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "2. Scan QR code above" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "3. Complete payment of ₹",
          erupiAmount
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: '4. Click "Payment Done" below' })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          className: "w-full font-bold",
          style: {
            background: "linear-gradient(135deg, #00FF88, #00cc6a)",
            color: "#0A0A0A",
            fontFamily: "Orbitron, sans-serif"
          },
          disabled: depositMutation.isPending,
          onClick: async () => {
            try {
              const amountInPaise = BigInt(
                Math.round((erupiAmount ?? 0) * 100)
              );
              await depositMutation.mutateAsync(amountInPaise);
              ue.success(`✅ ₹${erupiAmount} added to your wallet!`);
              setErupiQrGenerated(false);
              setErupiAmount(null);
              setErupiCustomAmount("");
              onClose();
            } catch (err) {
              ue.error((err == null ? void 0 : err.message) || "Failed to confirm payment");
            }
          },
          "data-ocid": "wallet.deposit.erupi_payment_done.button",
          children: depositMutation.isPending ? "Processing..." : "✅ PAYMENT DONE"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setErupiQrGenerated(false),
          className: "w-full text-xs text-gray-400 hover:text-white py-1 transition-colors",
          "data-ocid": "wallet.deposit.erupi_back.button",
          children: "← Change Amount"
        }
      )
    ] }) })
  ] });
}
const DAILY_LIMIT = 2;
function WithdrawDialog({
  balance,
  onClose,
  userId
}) {
  const [method, setMethod] = reactExports.useState("upi");
  const [amount, setAmount] = reactExports.useState("");
  const [upiId, setUpiId] = reactExports.useState("");
  const [generatedVoucher, setGeneratedVoucher] = reactExports.useState(null);
  const [voucherCopied, setVoucherCopied] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [submittedAmount, setSubmittedAmount] = reactExports.useState(0);
  const withdrawMutation = useWithdraw();
  const queryClient = useQueryClient();
  const balanceRupees = Number(balance) / 100;
  const uid = userId ?? "guest";
  const getMinMax = () => {
    return { min: 10, max: 500 };
  };
  const handleCopyVoucherCode = async () => {
    if (!generatedVoucher) return;
    try {
      await navigator.clipboard.writeText(generatedVoucher.code);
      setVoucherCopied(true);
      ue.success("Voucher code copied!", {
        description: "Paste it in Google Play Store to redeem"
      });
      setTimeout(() => setVoucherCopied(false), 3e3);
    } catch {
      ue.error("Could not copy. Please copy manually.");
    }
  };
  const handleSubmit = async (e) => {
    var _a;
    e.preventDefault();
    const amountValue = Number.parseFloat(amount);
    const { min: min2, max: max2 } = getMinMax();
    if (Number.isNaN(amountValue) || amountValue <= 0) {
      ue.error("Please enter a valid amount");
      return;
    }
    if (amountValue < min2) {
      ue.error(`Minimum withdrawal is ₹${min2} for this method`);
      return;
    }
    if (amountValue > max2) {
      ue.error(`Maximum withdrawal is ₹${max2} per request`);
      return;
    }
    if (amountValue > balanceRupees) {
      ue.error("Insufficient wallet balance");
      return;
    }
    const todayCount2 = getWithdrawalsToday(uid);
    if (todayCount2 >= DAILY_LIMIT) {
      ue.error(
        `Daily withdrawal limit reached (${DAILY_LIMIT} requests per day). Try again tomorrow.`
      );
      return;
    }
    if (method === "upi") {
      if (!upiId.trim()) {
        ue.error("Please enter your UPI ID");
        return;
      }
      const upiCount = getUpiUsageCount(uid, upiId.trim());
      if (upiCount >= 3) {
        ue.error(
          "This UPI ID has been used too many times. Contact support."
        );
        return;
      }
    }
    try {
      const amountInPaise = BigInt(Math.round(amountValue * 100));
      const result = await withdrawMutation.mutateAsync(amountInPaise);
      const requestId = ((_a = result == null ? void 0 : result.id) == null ? void 0 : _a.toString()) ?? `wd_${Date.now()}`;
      let voucherCode;
      if (method === "voucher") {
        voucherCode = generateVoucherCode();
        const now = Date.now();
        const expiry = now + 365 * 24 * 60 * 60 * 1e3;
        const newVoucher = {
          id: `voucher_${now}_${Math.random().toString(36).slice(2, 7)}`,
          userId: uid,
          code: voucherCode,
          amount: amountValue,
          createdAt: now,
          expiresAt: expiry,
          status: "unused",
          withdrawalRequestId: requestId
        };
        const allVouchers = getMyVouchers();
        allVouchers.push(newVoucher);
        saveMyVouchers(allVouchers);
        setGeneratedVoucher({
          code: voucherCode,
          amount: amountValue,
          expiresAt: expiry
        });
      }
      const detail = {
        requestId,
        userId: uid,
        method,
        amount: amountValue,
        timestamp: Date.now(),
        status: method === "voucher" ? "approved" : "pending",
        ...method === "upi" ? { upiId: upiId.trim() } : {},
        ...method === "voucher" ? {
          voucherCode,
          voucherExpiry: Date.now() + 365 * 24 * 60 * 60 * 1e3
        } : {}
      };
      const existing = getWithdrawalDetails();
      existing.push(detail);
      saveWithdrawalDetails(existing);
      incrementWithdrawalsToday(uid);
      await queryClient.invalidateQueries({ queryKey: ["callerWallet"] });
      await queryClient.invalidateQueries({
        queryKey: ["callerWithdrawalRequests"]
      });
      setSubmittedAmount(amountValue);
      setSubmitted(true);
    } catch (error) {
      ue.error((error == null ? void 0 : error.message) || "Failed to submit withdrawal request");
    }
  };
  const methodLabel = {
    upi: "UPI Transfer",
    voucher: "Google Play Voucher"
  };
  if (submitted && method === "voucher" && generatedVoucher) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-5 w-5 text-green-400" }),
        "Play Store Voucher Ready!"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "space-y-5",
          "data-ocid": "wallet.withdraw.voucher.success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-green-500/20 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-8 w-8 text-green-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold font-display text-green-300", children: [
                  "₹",
                  generatedVoucher.amount
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Play Store Voucher" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-green-500/40 bg-green-950/30 p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-400 font-semibold uppercase tracking-wider text-center", children: "Your Voucher Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "font-mono text-2xl font-bold tracking-[0.15em] text-center py-3 px-2 rounded-lg bg-black/40 border border-green-500/20 select-all",
                  style: { textShadow: "0 0 12px rgba(74,222,128,0.4)" },
                  children: generatedVoucher.code
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleCopyVoucherCode,
                  className: `w-full transition-all ${voucherCopied ? "bg-green-600 hover:bg-green-600" : "bg-green-700/60 hover:bg-green-600 border border-green-500/40"}`,
                  "data-ocid": "wallet.withdraw.copy_voucher.button",
                  children: voucherCopied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 mr-2" }),
                    "Copied!"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4 mr-2" }),
                    "Copy Code"
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
              "Expires:",
              " ",
              new Date(generatedVoucher.expiresAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/30 bg-muted/10 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4 text-green-400" }),
                "How to Redeem"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-1.5 text-xs text-muted-foreground list-none", children: [
                "Open Google Play Store app on your phone",
                'Tap your profile icon (top right) → "Payments & subscriptions"',
                'Select "Redeem gift code"',
                "Paste your voucher code and tap Redeem",
                "Balance will be added to your Play Store account"
              ].map((step, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static steps
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400 font-bold shrink-0 w-4 text-right", children: [
                    i + 1,
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
                ] }, i)
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-yellow-950/20 border border-yellow-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-yellow-400 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-300", children: 'Save this code now. It is also available in your "My Vouchers" section in Profile.' })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1 border-primary/30",
                  onClick: onClose,
                  "data-ocid": "wallet.withdraw.close_button",
                  children: "Done"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "flex-1 bg-green-700/60 hover:bg-green-600 border border-green-500/40",
                  onClick: () => window.open(
                    "https://play.google.com/store",
                    "_blank",
                    "noopener"
                  ),
                  "data-ocid": "wallet.withdraw.open_playstore.button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-4 w-4 mr-2" }),
                    "Open Play Store"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] });
  }
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Withdrawal Requested" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-4 py-6 text-center",
          "data-ocid": "wallet.withdraw.success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full bg-yellow-500/20 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-10 w-10 text-yellow-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-yellow-300", children: [
              "₹",
              submittedAmount,
              " Request Submitted!"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Your withdrawal request is pending admin approval. You will be notified once it is processed." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full p-3 rounded-lg bg-muted text-left space-y-1 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Method:" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: methodLabel[method] })
              ] }),
              method === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "UPI ID:" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: upiId })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "w-full",
                onClick: onClose,
                "data-ocid": "wallet.withdraw.close_button",
                children: "Done"
              }
            )
          ]
        }
      )
    ] });
  }
  const { min, max } = getMinMax();
  const todayCount = getWithdrawalsToday(uid);
  const remainingToday = DAILY_LIMIT - todayCount;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-5 w-5 text-primary" }),
        "Withdraw Money"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Choose a withdrawal method and fill in the details" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-5",
        "data-ocid": "wallet.withdraw.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Available Balance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-display", children: formatCurrency(balance) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Today's Requests" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: `font-semibold text-sm ${remainingToday <= 0 ? "text-destructive" : "text-green-400"}`,
                  children: [
                    todayCount,
                    "/",
                    DAILY_LIMIT,
                    " used"
                  ]
                }
              )
            ] })
          ] }),
          remainingToday <= 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive",
              "data-ocid": "wallet.withdraw.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 flex-shrink-0" }),
                "Daily limit reached (2/day). Try again tomorrow."
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: "Withdrawal Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              RadioGroup,
              {
                value: method,
                onValueChange: (v) => {
                  setMethod(v);
                  setAmount("");
                },
                className: "space-y-2",
                "data-ocid": "wallet.withdraw.select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "method-upi",
                      className: `flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${method === "upi" ? "border-blue-500/60 bg-blue-500/10" : "border-border hover:border-primary/40 hover:bg-muted/40"}`,
                      "data-ocid": "wallet.withdraw.upi.radio",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "upi", id: "method-upi" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-4 w-4 text-blue-400 flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "UPI (GPay / PhonePe / Paytm)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "₹10 – ₹500 · Admin approval required" })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "method-voucher",
                      className: `flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${method === "voucher" ? "border-green-500/60 bg-green-500/10" : "border-border hover:border-primary/40 hover:bg-muted/40"}`,
                      "data-ocid": "wallet.withdraw.voucher.radio",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "voucher", id: "method-voucher" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-4 w-4 text-green-400 flex-shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Google Play Store Voucher" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-green-500/20 text-green-300 border border-green-500/30 px-1.5 py-0.5 rounded-full font-medium", children: "INSTANT ⚡" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "₹10 – ₹500 · Code generated instantly, no admin approval" })
                        ] })
                      ]
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "withdrawAmount", children: [
              "Amount (₹)",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal text-xs", children: [
                "Min ₹",
                min,
                " – Max ₹",
                max
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "withdrawAmount",
                type: "number",
                step: "1",
                min,
                max: Math.min(max, balanceRupees),
                value: amount,
                onChange: (e) => setAmount(e.target.value),
                placeholder: `Enter amount (₹${min} - ₹${max})`,
                required: true,
                "data-ocid": "wallet.withdraw.amount.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1", children: [10, 50, 100, 500].filter((v) => v >= min && v <= Math.min(max, balanceRupees)).map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "text-xs border-primary/30",
                onClick: () => setAmount(v.toString()),
                children: [
                  "₹",
                  v
                ]
              },
              v
            )) })
          ] }),
          method === "upi" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "upiId", children: "UPI ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "upiId",
                value: upiId,
                onChange: (e) => setUpiId(e.target.value),
                placeholder: "yourname@oksbi",
                required: true,
                "data-ocid": "wallet.withdraw.upi_id.input",
                className: "font-mono"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Formats: number@okhdfcbank, number@okicici, name@paytm" })
          ] }),
          method === "voucher" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-green-950/30 border border-green-500/20 text-sm space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-green-300 font-medium flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-4 w-4" }),
              "Play Store Voucher — Instant Delivery"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-muted-foreground space-y-1 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ Unique code generated instantly on withdrawal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ No admin approval needed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ Code valid for 1 year" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: '✅ Saved in "My Vouchers" in your Profile' }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ Redeem directly on Google Play Store" })
            ] }),
            amount && Number(amount) >= min && Number(amount) <= max && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 pt-2 border-t border-green-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-green-400", children: [
              "Preview code format:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold", children: "ABCD-1234-EFGH-5678" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: `w-full ${method === "voucher" ? "bg-green-700 hover:bg-green-600" : ""}`,
              disabled: withdrawMutation.isPending || remainingToday <= 0,
              "data-ocid": "wallet.withdraw.submit_button",
              children: withdrawMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                method === "voucher" ? "Generating Code..." : "Submitting..."
              ] }) : method === "voucher" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-4 w-4" }),
                "Generate Voucher Code"
              ] }) : "Submit Withdrawal Request"
            }
          )
        ]
      }
    )
  ] });
}
const WalletPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WalletPage,
  generateVoucherCode,
  getMyVouchers,
  getRedeemRequests,
  getWithdrawalDetails,
  saveMyVouchers,
  saveRedeemRequests,
  saveWithdrawalDetails
}, Symbol.toStringTag, { value: "Module" }));
export {
  Copy as C,
  ExternalLink as E,
  Plus as P,
  ShoppingBag as S,
  Ticket as T,
  WalletPage$1 as W,
  getRedeemRequests as a,
  getMyVouchers as b,
  saveRedeemRequests as c,
  saveMyVouchers as d,
  getWithdrawalDetails as g,
  saveWithdrawalDetails as s
};
