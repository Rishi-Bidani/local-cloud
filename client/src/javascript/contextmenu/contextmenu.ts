import { ContextOption, ContextOptionName } from "./types";

class ZipOption extends ContextOption {
    constructor() {
        super("zip");
    }

    async execute() {
        if (Context.filename === null) {
            alert("No file selected");
            return;
        }

        console.log("zip");
        let fullpath = window.location.pathname.replace(/^\/|\/$/g, "") + "/" + Context.filename;
        console.log(fullpath);
        const response = await fetch(`/create/zip`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pathname: fullpath }),
        });
        const data = await response.text();
        console.log(data);
    }
}

class DeleteOption extends ContextOption {
    constructor() {
        super("delete");
    }

    async execute() {
        if (Context.filename === null) {
            alert("No file selected");
            return;
        }

        console.log("delete");
        let fullpath = window.location.pathname.replace(/^\/|\/$/g, "") + "/" + Context.filename;
        console.log(fullpath);
        if (confirm(`[DANGER] Are you sure you want to delete ${Context.filename}?`)) {
            const response = await fetch(`/delete/folder`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pathname: fullpath }),
            });
            const data = await response.text();
            console.log(data);
            // if deleted successfully, reload page
            if (response.status === 200) {
                window.location.reload();
            }
        } else {
            console.log("delete cancelled");
        }
    }
}

class Context {
    static filename: string | null = null;
    static options: Array<ContextOption> = [new ZipOption(), new DeleteOption()];

    static open(event: MouseEvent, _filename: string) {
        event.preventDefault();
        event.stopPropagation();

        const contextMenu = document.querySelector(".context-menu") as HTMLElement;
        contextMenu.classList.remove("hidden");
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.left = `${event.clientX}px`;

        Context.filename = _filename;
    }

    static close() {
        const contextMenu = document.querySelector(".context-menu") as HTMLElement;
        contextMenu.classList.add("hidden");
        Context.filename = null;
    }

    static exexuteOption(optionName: ContextOptionName) {
        const option = Context.options.find((option) => option.name === optionName);
        if (option) {
            option.execute();
        }
    }
}

export default Context;
