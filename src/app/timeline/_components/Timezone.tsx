import React from 'react'

export default function Timezone() {
  return (
    <div className="flex items-center mb-4 gap-4 flex-col md:flex-row">
                    <button
                        type="button"
                        role="combobox"
                        aria-controls="radix-:ri:"
                        aria-expanded="false"
                        aria-autocomplete="none"
                        dir="ltr"
                        data-state="closed"
                        data-placeholder=""
                        class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 max-w-sm"
                        aria-label="Choose Server Time Zone"
                    >
                        <span style="pointer-events: none;">
                            Asia/Shanghai ✦ Asia/Shanghai (UTC+8)
                        </span>
                        
                    </button>
                    <div class="flex items-center space-x-2">
                        <button
                            type="button"
                            role="checkbox"
                            aria-checked="true"
                            data-state="checked"
                            value="on"
                            class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            id="show-local-time"
                        >
                            <span
                                data-state="checked"
                                class="flex items-center justify-center text-current"
                                style="pointer-events: none;"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-check h-4 w-4"
                                >
                                    <path d="M20 6 9 17l-5-5"></path>
                                </svg>
                            </span>
                        </button>
                        <label
                            for="show-local-time"
                            class="text-sm select-none font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Show dates as your local time zone{" "}
                            <span class="text-muted-foreground">
                                (Asia/Dhaka)
                            </span>
                        </label>
                    </div>
                </div>
  )
}
