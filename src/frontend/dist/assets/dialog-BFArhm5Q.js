import { j as jsxRuntimeExports, bD as Root, bE as Trigger, bF as Content, x as cn, bG as Close, X, bH as Title, bI as Description, bJ as Portal, bK as Overlay, aX as DocumentSnapshot, aY as QueryCompositeFilterConstraint, aZ as QueryConstraint, a_ as QueryDocumentSnapshot, a$ as QueryFieldFilterConstraint, b0 as QueryOrderByConstraint, b1 as QuerySnapshot, b2 as SnapshotMetadata, b3 as addDoc, b4 as executeWrite, b5 as getDoc, b6 as getDocs, b7 as orderBy, b8 as query, b9 as setDoc, ba as updateDoc, bb as where, bc as AbstractUserDataWriter, bd as Bytes, be as CollectionReference, bf as DocumentReference, bg as FieldPath, bh as FieldValue, bi as Firestore, bj as FirestoreError, bk as GeoPoint, bl as Query, bm as Timestamp, bn as VectorValue, bo as __PRIVATE_AutoId, bp as ByteString, bq as DatabaseId, br as DocumentKey, bs as __PRIVATE_EmptyAuthCredentialsProvider, bt as FieldPath$1, bu as __PRIVATE_cast, bv as __PRIVATE_logWarn, bw as __PRIVATE_validateIsNotUsedTogether, bx as collection, by as connectFirestoreEmulator, bz as doc, bA as ensureFirestoreConfigured, bB as getFirestore, bC as serverTimestamp } from "./index-CHYy-HWx.js";
const index_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbstractUserDataWriter,
  Bytes,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  FieldPath,
  FieldValue,
  Firestore,
  FirestoreError,
  GeoPoint,
  Query,
  QueryCompositeFilterConstraint,
  QueryConstraint,
  QueryDocumentSnapshot,
  QueryFieldFilterConstraint,
  QueryOrderByConstraint,
  QuerySnapshot,
  SnapshotMetadata,
  Timestamp,
  VectorValue,
  _AutoId: __PRIVATE_AutoId,
  _ByteString: ByteString,
  _DatabaseId: DatabaseId,
  _DocumentKey: DocumentKey,
  _EmptyAuthCredentialsProvider: __PRIVATE_EmptyAuthCredentialsProvider,
  _FieldPath: FieldPath$1,
  _cast: __PRIVATE_cast,
  _logWarn: __PRIVATE_logWarn,
  _validateIsNotUsedTogether: __PRIVATE_validateIsNotUsedTogether,
  addDoc,
  collection,
  connectFirestoreEmulator,
  doc,
  ensureFirestoreConfigured,
  executeWrite,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
}, Symbol.toStringTag, { value: "Module" }));
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
export {
  Dialog as D,
  DialogContent as a,
  DialogHeader as b,
  DialogTitle as c,
  DialogDescription as d,
  DialogTrigger as e,
  index_esm as i
};
