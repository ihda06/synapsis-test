import { AnimatePresence, motion } from "framer-motion";
import { Dialog as HeadlessDialog, DialogPanel } from "@headlessui/react";
import cn from "@/utils/formatter";

export default function Dialog({
  isOpen,
  onOpenChange,
  className,
  children,
}: {
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <HeadlessDialog
          static
          open={isOpen}
          onClose={() => onOpenChange(false)}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/30"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.2 },
              }}
              className={cn(
                "max-w-lg space-y-4 bg-white dark:bg-black dark:border-white dark:border p-12 rounded",
                className
              )}
            >
              {children}
            </DialogPanel>
          </div>
        </HeadlessDialog>
      )}
    </AnimatePresence>
  );
}
