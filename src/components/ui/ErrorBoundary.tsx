"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50/50 p-8 text-center">
          <AlertCircle className="h-8 w-8 text-red-500" aria-hidden="true" />
          <h3 className="mt-3 font-display text-lg font-semibold text-red-700">
            Une erreur est survenue
          </h3>
          <p className="mt-1 text-sm text-red-600">
            {this.state.error?.message || "Veuillez réessayer."}
          </p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Rafraîchir la page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}