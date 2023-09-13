import { Button } from "./components/ui/button";
import { Github, Wand2 } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PrompSelect } from "./components/promp-select";
import { useState } from "react";
import { useCompletion } from "ai/react";

export function App() {
	const [temperature, setTemperature] = useState(0.5);
	const [videoId, setVideoId] = useState<String | null>(null);

	const {
		input,
		setInput,
		handleSubmit,
		handleInputChange,
		completion,
		isLoading,
	} = useCompletion({
		api: "http://localhost:3333/ai/complete",
		body: {
			videoId,
			temperature,
		},
		headers: {
			"Content-Type": "application/json",
		},
	});

	function handleVideoProcessed(videoId: string) {
		setVideoId(videoId);
	}

	return (
		<div className="min-h-screen flex flex-col">
			<div className="px-6 py-3 flex items-center justify-between border-b">
				<h1 className="text-xl font-bold">upload.ai</h1>
				<div className="flex items-center gap-3">
					<span className="text-sm text-muted-foreground">
						Desenvolvido com ❤ no NLW da Rocketseat.
					</span>
					<Separator orientation="vertical" className="h-6" />
					<Button variant="outline">
						<Github className="w-4 h-4 mr-2" />
						GitHub
					</Button>
				</div>
			</div>
			<main className="flex-1 p-6 flex gap-6">
				<div className="flex flex-col flex-1 gap-4">
					<div className="grid grid-rows-2 gap-4 flex-1">
						<Textarea
							className="resize-none p-5 leading-relaxed"
							placeholder="Inclua o prompt para a IA..."
							value={input}
							onChange={handleInputChange}
						/>
						<Textarea
							className="resize-none p-5 leading-relaxed"
							placeholder="Resultado gerado pela IA..."
							readOnly
							value={completion}
						/>
					</div>
					<p className="text-muted-foreground text-sm">
						Lembre-se: você pode utilizar a variável{" "}
						<code className="text-violet-400">{"{transcription}"}</code> no seu
						prompt para adicionar o conteuúdo da transcrição dovídeo
						selecionado.
					</p>
				</div>
				<aside className="w-80 space-y-6">
					<VideoInputForm onVideoUploaded={handleVideoProcessed} />
					<Separator />
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<Label>Prompt</Label>
						</div>
						<div className="space-y-2">
							<Label>Modelo</Label>
							<PrompSelect onPromptSelected={setInput} />
							<span className="block text-xs text-muted-foreground italic">
								Você poderá customizar essa opção em breve
							</span>
						</div>
						<Separator />
						<div className="space-y-4">
							<Label>Temperatura</Label>
							<Slider
								min={0}
								max={1}
								step={0.1}
								value={[temperature]}
								onValueChange={(value) => setTemperature(value[0])}
							/>
							<span className="block text-xs text-muted-foreground italic leading-relaxed">
								Valores mais altos tendem a deixar o resultado mais criativo e
								com possíveis erros.
							</span>

							<Separator />
							<Button className="w-full" type="submit" disabled={isLoading}>
								Executar
								<Wand2 className="w-4 h-4 ml-2" />
							</Button>
						</div>
					</form>
				</aside>
			</main>
		</div>
	);
}
