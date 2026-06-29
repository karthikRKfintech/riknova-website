import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface BookDemoModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const BookDemoModalContext = createContext<BookDemoModalContextValue | null>(
  null,
);

export function BookDemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openModal, closeModal }),
    [isOpen, openModal, closeModal],
  );

  return (
    <BookDemoModalContext.Provider value={value}>
      {children}
    </BookDemoModalContext.Provider>
  );
}

export function useBookDemoModal() {
  const ctx = useContext(BookDemoModalContext);
  if (!ctx) {
    throw new Error(
      "useBookDemoModal must be used within a BookDemoModalProvider",
    );
  }
  return ctx;
}
